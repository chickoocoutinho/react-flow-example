import { useCallback, useContext, useState } from "react";
import FlowContext from "../../../context/FlowContext/FlowContext";
import debounce from "../../../utils/debounce";
import styles from "./messageNode.module.css";

const MessageNodeSettings = () => {
	const { selectedNode, updateNodesData } = useContext(FlowContext);

	const [message, setMessage] = useState(selectedNode?.data?.message ?? "");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdate = useCallback(
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
