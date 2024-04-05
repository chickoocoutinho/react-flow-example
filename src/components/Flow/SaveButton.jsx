import { useContext } from "react";
import { getConnectedEdges } from "reactflow";
import toast from "react-hot-toast";

import Button from "../common/Button/Button";
import styles from "./flow.module.css";
import FlowContext from "../../context/FlowContext/FlowContext";
import ErrorToast from "../common/ErrorToast/ErrorToast";
import { setSavedData } from "../../service/browser/storage";

const SaveButton = () => {
	const { nodes, edges } = useContext(FlowContext);

	//Save Functionality not kept in FlowContext to provide more flexibility on validations
	const handleSave = () => {
		//b. Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles
		if (nodes.length === 0) {
			handleSaveError();
			return;
		}

		if (nodes.length === 1) {
			handleSaveSuccess();
			return;
		}

		const nodeIdSet = new Set(nodes.map((node) => node.id));
		const connectedEdges = getConnectedEdges(nodes, edges);
		connectedEdges.forEach((edge) => {
			nodeIdSet.delete(edge.target);
		});

		if (nodeIdSet.size >= 2) {
			handleSaveError();
			return;
		}

		handleSaveSuccess();
	};

	const handleSaveSuccess = () => {
		toast.success("Data Saved");
		setSavedData({ nodes, edges });
	};

	const handleSaveError = () => {
		toast.custom(<ErrorToast>Cannot Save Flow</ErrorToast>);
	};

	return (
		<div className={styles.saveButtonRoot}>
			<Button onClick={handleSave}>Save Changes</Button>
		</div>
	);
};

export default SaveButton;
