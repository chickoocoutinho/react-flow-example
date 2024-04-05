import { useContext } from "react";

import IconButton from "../../common/IconButton/IconButton";
import { getNodeSettingsComponent, getNodeSettingsHeading } from "../../Nodes/helper";
import FlowContext from "../../../context/FlowContext/FlowContext";
import styles from "./sidePanel.module.css";

import BackSvg from "../../../assets/back.svg";
import DeleteSvg from "../../../assets/delete.svg";

// Content of settings panel is dynamically rendered from Nodes helper function
// This is done to ensure smooth addition of more nodes in the future
const SettingsPanel = () => {
	const { selectedNode, handleSelectionChange, handleNodeDelete } =
		useContext(FlowContext);

	const handleBack = () => {
		//Manually set the selectedNode to null to close settings panel
		handleSelectionChange(null);
	};

	const handleDelete = () => {
		const selectedNodeId = selectedNode.id;
		handleBack();
		handleNodeDelete(selectedNodeId);
	};

	return (
		<div>
			<div className={styles.settingsPanelHeader}>
				<IconButton onClick={handleBack}>
					<BackSvg />
				</IconButton>
				<p>{getNodeSettingsHeading(selectedNode.type)}</p>
				<IconButton className={styles.deleteNode} onClick={handleDelete}>
					<DeleteSvg />
				</IconButton>
			</div>
			<div className={styles.settingsPanelContent}>
				{getNodeSettingsComponent(selectedNode.type)}
			</div>
		</div>
	);
};

export default SettingsPanel;
