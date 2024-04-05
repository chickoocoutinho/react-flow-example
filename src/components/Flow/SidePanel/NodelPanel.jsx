import Button from "../../common/Button/Button";
import { getAllNodeTypes } from "../../Nodes/helper";
import styles from "./sidePanel.module.css";

// Get an array of all node tyoes
const nodes = getAllNodeTypes();

const NodelPanel = () => {
	const onDragStart = (event, nodeType) => {
		//On drag handler for drang and drop functionality
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div className={styles.nodePanelRoot}>
			{nodes.map((node) => (
				<Button
					draggable
					key={node.label}
					onDragStart={(event) => onDragStart(event, node.type)}
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
