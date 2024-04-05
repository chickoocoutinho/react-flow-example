import Button from "../../common/Button/Button";
import { getAllNodeTypes } from "../../Nodes/helper";
import styles from "./sidePanel.module.css";

const nodes = getAllNodeTypes();

const ControlPanel = () => {
	const onDragStart = (event, nodeType) => {
		console.log("EVENT");
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div className={styles.controlPanelRoot}>
			{nodes.map((node) => (
				<Button
					draggable
					key={node.label}
					onDragStart={(event) => onDragStart(event, node.type)}
					onClick={() => console.log("CLICK")}
				>
					<div className={styles.controlPanelButtonContent}>
						<node.icon className={styles.controlPanelButtonIcon} />
						<p>{node.label}</p>
					</div>
				</Button>
			))}
		</div>
	);
};

export default ControlPanel;
