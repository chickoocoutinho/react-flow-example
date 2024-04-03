import { createContext, useCallback, useEffect, useState } from "react";
import { applyEdgeChanges, applyNodeChanges, addEdge, MarkerType } from "reactflow";
import MessageNode from "../components/Nodes/MessageNode/MessageNode";

const nodeTypes = { messageNode: MessageNode };

const FlowContext = createContext({});

export const FlowContextProvider = ({ children }) => {
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
		],
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

	const onConnect = useCallback(
		(params) =>
			setFlowState((state) => ({
				...state,
				edges: addEdge(
					{ ...params, markerEnd: { type: MarkerType.ArrowClosed } },
					state.edges
				),
			})),
		[]
	);

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

	return (
		<FlowContext.Provider
			value={{
				nodeTypes,
				edges: flowState.edges,
				nodes: flowState.nodes,
				onNodesChange,
				onEdgesChange,
				onConnect,
				updateNodesData,
			}}
		>
			{children}
		</FlowContext.Provider>
	);
};

export default FlowContext;
