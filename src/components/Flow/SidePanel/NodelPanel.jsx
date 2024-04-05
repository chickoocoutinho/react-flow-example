import { useContext } from "react";
import toast from "react-hot-toast";

import Button from "../../common/Button/Button";
import { getAllNodeTypes } from "../../Nodes/helper";
import styles from "./sidePanel.module.css";
import FlowContext from "../../../context/FlowContext/FlowContext";

// Get an array of all node tyoes
const nodes = getAllNodeTypes();

const NodelPanel = ({ handleSidePanelClose }) => {
	const { handleNodeAdd } = useContext(FlowContext);

	const onDragStart = (event, nodeType) => {
		//On drag handler for drang and drop functionality
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	const onDrag = () => {
		//Close side panel to allow easy drag and drop  on smaller screens
		handleSidePanelClose();
	};

	const onTouchStart = (nodeType) => {
		handleNodeAdd(nodeType);
		// User feedback when node is added
		toast.success("Node Added");
		onDrag();
	};

	return (
		<div className={styles.nodePanelRoot}>
			{nodes.map((node) => (
				<Button
					draggable
					key={node.label}
					onDragStart={(event) => onDragStart(event, node.type)}
					onDrag={onDrag}
					onTouchStart={() => onTouchStart(node.type)}
				>
					<div className={styles.nodePanelButtonContent}>
						<node.icon className={styles.nodePanelButtonIcon} />
						<p>{node.label}</p>
					</div>
				</Button>
			))}
		</div>
	);
};

export default NodelPanel;
