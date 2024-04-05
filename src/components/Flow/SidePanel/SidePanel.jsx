import { useContext } from "react";

import FlowContext from "../../../context/FlowContext/FlowContext";
import NodelPanel from "./NodelPanel";
import styles from "./sidePanel.module.css";

const SidePanel = () => {
	const { selectedNode } = useContext(FlowContext);

	return (
		<div className={styles.sidePanelRoot}>
			<div>
				<NodelPanel />
			</div>
		</div>
	);
};

export default SidePanel;
