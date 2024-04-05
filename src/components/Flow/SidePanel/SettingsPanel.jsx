import IconButton from "../../common/IconButton/IconButton";

import BackSvg from "../../../assets/back.svg";
import { getNodeSettingsComponent, getNodeSettingsHeading } from "../../Nodes/helper";
import { useContext } from "react";
import FlowContext from "../../../context/FlowContext/FlowContext";

import styles from "./sidePanel.module.css";

const SettingsPanel = () => {
	const { selectedNode, handleSelectionChange } = useContext(FlowContext);

	const handleBack = () => {
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
				{getNodeSettingsComponent({
					messageType: selectedNode.type,
					data: selectedNode.data,
				})}
			</div>
		</div>
	);
};

export default SettingsPanel;
