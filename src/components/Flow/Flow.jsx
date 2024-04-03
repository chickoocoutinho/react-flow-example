import { useContext } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import FlowContext from "../../context/FlowContext";

const Flow = () => {
	const {
		nodeTypes,

		edges,
		nodes,
		onNodesChange,
		onEdgesChange,
		onConnect,
	} = useContext(FlowContext);

	return (
		<div style={{ height: "100%" }}>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Flow;
