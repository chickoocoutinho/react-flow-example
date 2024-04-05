import IconButton from "../../common/IconButton/IconButton";

import BackSvg from "../../../assets/back.svg";
import { getNodeSettingsComponent, getNodeSettingsHeading } from "../../Nodes/helper";
import { useContext } from "react";
import FlowContext from "../../../context/FlowContext/FlowContext";

import styles from "./sidePanel.module.css";

// Content of settings panel is dynamically rendered from Nodes helper function
// This is done to ensure smooth addition of more nodes in the future
const SettingsPanel = () => {
	const { selectedNode, handleSelectionChange } = useContext(FlowContext);

	const handleBack = () => {
		//Manually set the selectedNode to null to close settings panel
		handleSelectionChange(null);
	};

	return (
		<div>
			<div className={styles.settingsPanelHeader}>
				<IconButton onClick={handleBack}>
					<BackSvg />
				</IconButton>
				<p>{getNodeSettingsHeading(selectedNode.type)}</p>
			</div>
			<div className={styles.settingsPanelContent}>
				{getNodeSettingsComponent(selectedNode.type)}
			</div>
		</div>
	);
};

export default SettingsPanel;
