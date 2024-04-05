import { useContext } from "react";

import FlowContext from "../../../context/FlowContext/FlowContext";
import NodelPanel from "./NodelPanel";
import styles from "./sidePanel.module.css";
import SettingsPanel from "./SettingsPanel";
import clsx from "clsx";

const SidePanel = () => {
	const { selectedNode } = useContext(FlowContext);

	return (
		<div className={styles.sidePanelRoot}>
			<div>{selectedNode ? <SettingsPanel /> : <NodelPanel />}</div>
		</div>
	);
};

export default SidePanel;
