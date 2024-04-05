import { useContext } from "react";

import FlowContext from "../../context/FlowContext/FlowContext";
import ControlPanel from "./ControlPanel";
import styles from "./flow.module.css";

const SidePanel = () => {
	const { selectedNode } = useContext(FlowContext);

	return (
		<div className={styles.sidePanelRoot}>
			<div>
				<ControlPanel />
			</div>
		</div>
	);
};

export default SidePanel;
