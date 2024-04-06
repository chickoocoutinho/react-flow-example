import { useCallback, useContext, useEffect, useState } from "react";

import FlowContext from "../../../context/FlowContext/FlowContext";
import debounce from "../../../utils/debounce";
import styles from "./messageNode.module.css";

// The following Component will br rendered in the Setting Panel when the node is selected
const MessageNodeSettings = () => {
	const { selectedNode, updateNodesData } = useContext(FlowContext);

	const [message, setMessage] = useState(selectedNode?.data?.message ?? "");

	useEffect(() => {
		// Update message when the selected node changes
		setMessage(selectedNode.data.message);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedNode.id]);

	const debouncedUpdate = useCallback(
		//updateNodesData updates the react flow state, debounced to reduce rerenders
		debounce((id, data) => {
			updateNodesData({
				id,
				data,
			});
		}),
		[updateNodesData]
	);

	const handleMessageChange = (event) => {
		const value = event.target.value;
		setMessage(value);
		debouncedUpdate(selectedNode.id, {
			message: value,
		});
	};

	return (
		<div className={styles.messageNodeSettingsRoot}>
			<p className={styles.messageNodeSettingsText}>Text</p>
			<textarea
				placeholder="Enter Message"
				className={styles.messageNodeSettingsInput}
				value={message}
				onChange={handleMessageChange}
			/>
		</div>
	);
};

export default MessageNodeSettings;
