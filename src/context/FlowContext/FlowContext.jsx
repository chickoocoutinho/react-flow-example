import { createContext, useCallback, useState } from "react";
import {
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	ReactFlowProvider,
	useOnSelectionChange,
	getOutgoers,
	getIncomers,
	useReactFlow,
} from "reactflow";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

import { getNodeDefaultData } from "../../components/Nodes/helper";
import { nodeTypes, markerEnd } from "./constants";

const FlowContext = createContext({});

const FlowContextProviderWrapper = ({ children }) => {
	const [flowState, setFlowState] = useState({
		edges: [],
		nodes: [
			{
				id: "1",
				data: { message: "Hello" },
				position: { x: 0, y: 0 },
				type: "messageNode",
			},
			{
				id: "2",
				data: { message: "World" },
				position: { x: 100, y: 100 },
				type: "messageNode",
			},
			{
				id: "3",
				data: { message: "World" },
				position: { x: 200, y: 200 },
				type: "messageNode",
			},
		],
		selectedNode: null,
	});

	const reactFlow = useReactFlow();

	const handleSelectionChange = (node) => {
		setFlowState((state) => {
			let nodes = [...state.nodes];
			if (!node && state.selectedNode) {
				let selectedNodeIndex = nodes.findIndex(
					(node) => node.id === state.selectedNode.id
				);
				if (selectedNodeIndex !== -1) {
					nodes[selectedNodeIndex].selected = false;
				}
			}

			return {
				...state,
				nodes,
				selectedNode: node,
			};
		});
	};

	useOnSelectionChange({
		onChange: ({ nodes }) => {
			setFlowState((state) => ({
				...state,
				selectedNode: nodes.length === 0 ? null : nodes[0],
			}));
		},
	});

	//Needs to be a callback because nodes and edges keep changing
	const onNodesChange = useCallback(
		(changes) =>
			setFlowState((state) => ({
				...state,
				nodes: applyNodeChanges(changes, state.nodes),
			})),
		[]
	);

	const onEdgesChange = useCallback(
		(changes) =>
			setFlowState((state) => ({
				...state,
				edges: applyEdgeChanges(changes, state.edges),
			})),
		[]
	);

	const onConnect = useCallback((params) => {
		setFlowState((state) => ({
			...state,
			edges: addEdge(
				{
					...params,
					markerEnd,
				},
				state.edges
			),
		}));
	}, []);

	const onSingleConnect = useCallback((params) => {
		setFlowState((state) => {
			const outgoers = getOutgoers({ id: params.source }, state.nodes, state.edges);
			const incomers = getIncomers({ id: params.target }, state.nodes, state.edges);

			if (outgoers.length !== 0 || incomers.length !== 0) {
				//Valid connection need to have 0 outgoers and incomers

				toast.error("Only one edge is allowed");
				return state;
			}

			return {
				...state,
				edges: addEdge({ ...params, markerEnd }, state.edges),
			};
		});
	}, []);

	const updateNodesData = useCallback(
		({ id, data }) =>
			setFlowState((state) => ({
				...state,
				nodes: state.nodes.map((node) =>
					node.id === id ? { ...node, data: { ...node.data, ...data } } : node
				),
			})),
		[]
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event) => {
			console.log("Rerendered");
			event.preventDefault();
			const type = event.dataTransfer.getData("application/reactflow");

			// check if the dropped element is valid
			if (typeof type === "undefined" || !type) {
				return;
			}

			const position = reactFlow.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: nanoid(),
				type,
				position,
				data: getNodeDefaultData(type),
			};

			setFlowState((state) => ({
				...state,
				nodes: [...state.nodes, newNode],
			}));
		},
		[reactFlow]
	);

	return (
		<FlowContext.Provider
			value={{
				nodeTypes,
				edges: flowState.edges,
				nodes: flowState.nodes,
				selectedNode: flowState.selectedNode,
				onNodesChange,
				onEdgesChange,
				onConnect,
				onSingleConnect,
				updateNodesData,
				onDrop,
				onDragOver,
				handleSelectionChange,
			}}
		>
			{children}
		</FlowContext.Provider>
	);
};

export const FlowContextProvider = ({ children }) => {
	return (
		<ReactFlowProvider>
			<FlowContextProviderWrapper>{children}</FlowContextProviderWrapper>
		</ReactFlowProvider>
	);
};

export default FlowContext;
