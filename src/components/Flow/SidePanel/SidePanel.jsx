import { useContext } from "react";

import FlowContext from "../../../context/FlowContext/FlowContext";
import NodelPanel from "./NodelPanel";
import styles from "./sidePanel.module.css";
import SettingsPanel from "./SettingsPanel";

const SidePanel = () => {
	const { selectedNode } = useContext(FlowContext);
	//View is toggled between settings panel and nodes panel based on selectedNode

	return (
		<div className={styles.sidePanelRoot}>
			<div>{selectedNode ? <SettingsPanel /> : <NodelPanel />}</div>
		</div>
	);
};

export default SidePanel;
