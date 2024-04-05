import { useContext } from "react";
import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

import FlowContext from "../../context/FlowContext/FlowContext";
import SaveButton from "./SaveButton";
import SidePanel from "./SidePanel/SidePanel";
import styles from "./flow.module.css";

const proOptions = { hideAttribution: true };

const Flow = () => {
	const {
		nodeTypes,
		edges,
		nodes,
		onNodesChange,
		onEdgesChange,
		onSingleConnect,
		onDrop,
		onDragOver,
	} = useContext(FlowContext);

	return (
		<div className={styles.flowRoot}>
			<SaveButton />
			<div className={styles.flowContentRoot}>
				<ReactFlow
					nodes={nodes}
					onNodesChange={onNodesChange}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onConnect={onSingleConnect}
					onDrop={onDrop}
					onDragOver={onDragOver}
					nodeTypes={nodeTypes}
					proOptions={proOptions}
					fitView
				/>
				<SidePanel />
			</div>
		</div>
	);
};

export default Flow;
