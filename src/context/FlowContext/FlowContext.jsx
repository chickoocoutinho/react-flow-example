import { createContext, useCallback, useEffect, useState } from "react";
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

import { nodeTypes, markerEnd, getSourceTargetNode } from "./constants";

import {
	getMaxIncomingOutgoingEdgeCount,
	getNodeDefaultData,
} from "../../components/Nodes/helper";

const FlowContext = createContext({});

const FlowContextProviderWrapper = ({ children, defaultData }) => {
	const [flowState, setFlowState] = useState({
		edges: [],
		nodes: [],
		selectedNode: null,
	});

	useEffect(() => {
		//Sync default data from parent with store
		if (defaultData) {
			console.log(defaultData);
			setFlowState({
				...defaultData,
				selectedNode: null,
			});
		}
	}, [defaultData]);

	const reactFlow = useReactFlow();

	//Function to manually Alter the selected node state of react flow
	const handleSelectionChange = (node) => {
		setFlowState((state) => {
			let nodes = [...state.nodes];
			if (!node && state.selectedNode) {
				//1. Find Selected Node
				let selectedNodeIndex = nodes.findIndex(
					(node) => node.id === state.selectedNode.id
				);
				//2. Set node selected flag to false
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

	//Hook to get selected node from react flow
	useOnSelectionChange({
		onChange: ({ nodes }) => {
			setFlowState((state) => ({
				...state,
				selectedNode: nodes.length === 0 ? null : nodes[0],
			}));
		},
	});

	//Functions passed to ReactFlow are memorised because the documentation mentions
	// Not doing this can incur a slight performance penalty.
	const onNodesChange = useCallback(
		//Function used to hande node state change
		(changes) =>
			setFlowState((state) => ({
				...state,
				nodes: applyNodeChanges(changes, state.nodes),
			})),
		[]
	);

	const onEdgesChange = useCallback(
		//Function used to hande edge state change
		(changes) =>
			setFlowState((state) => ({
				...state,
				edges: applyEdgeChanges(changes, state.edges),
			})),
		[]
	);

	// Function used to hande Connections
	// function contains connection Validation based on number of incoming and outgoing nodes
	const onConnect = useCallback((params) => {
		setFlowState((state) => {
			//1. Get Source and target node from id (This is done to get the type of the node)
			const [sourceNode, targetNode] = getSourceTargetNode({
				nodes: state.nodes,
				sourceId: params.source,
				targetId: params.target,
			});

			if (!sourceNode || !targetNode) {
				toast.error("Invalid Connection");
				return state;
			}

			//2. Get the outgoing edges from source and incoming edges to target
			const outgoers = getOutgoers({ id: params.source }, state.nodes, state.edges);
			const incomers = getIncomers({ id: params.target }, state.nodes, state.edges);

			//3. Get Maximum number of allowed incoming and outgoing edges
			const { outgoing } = getMaxIncomingOutgoingEdgeCount(sourceNode.type);
			const { incoming } = getMaxIncomingOutgoingEdgeCount(targetNode.type);

			//4. If the current edge count is MAX. show user an error
			if (outgoers.length === outgoing) {
				toast.error(
					`Source Node can have only have ${outgoing} outgoing edge${
						outgoing !== 1 ? "s" : ""
					}`
				);
				return state;
			}

			if (incomers.length === incoming) {
				toast.error(
					`Target Node can have only have ${incoming} incoming edge${
						incoming !== 1 ? "s" : ""
					}`
				);
				return state;
			}

			//5. new connection is valid, add the edge
			return {
				...state,
				edges: addEdge({ ...params, markerEnd }, state.edges),
			};
		});
	}, []);

	const updateNodesData = useCallback(
		//Function used to update the node's data object
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
			event.preventDefault();
			const type = event.dataTransfer.getData("application/reactflow");

			//1. check if the dropped element is valid
			if (typeof type === "undefined" || !type) {
				return;
			}

			//2. Convert the drop position to corresponding position in the react flow element
			const position = reactFlow.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: nanoid(),
				type,
				position,
				data: getNodeDefaultData(type), // Helper function used to get the default data object for each node type
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

export const FlowContextProvider = ({ children, defaultData }) => {
	return (
		<ReactFlowProvider>
			<FlowContextProviderWrapper defaultData={defaultData}>
				{children}
			</FlowContextProviderWrapper>
		</ReactFlowProvider>
	);
};

export default FlowContext;
