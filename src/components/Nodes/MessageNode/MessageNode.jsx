import { useCallback, useContext } from "react";
import BaseNode from "../BaseNode/BaseNode";

import MessageHeader from "./MessageHeader";
import styles from "./messageNode.module.css";
import FlowContext from "../../../context/FlowContext";

const sourceHandlers = [
	{
		position: "Right",
	},
];

const targetHandlers = [
	{
		position: "Left",
	},
];

const headerProps = {
	className: styles.headerRoot,
};

const MessageNode = ({ data, id }) => {
	const { updateNodesData } = useContext(FlowContext);

	const onChange = useCallback(
		(evt) =>
			updateNodesData({
				id,
				data: {
					message: evt.target.value,
				},
			}),
		[id, updateNodesData]
	);

	return (
		<BaseNode
			sourceHandlers={sourceHandlers}
			targetHandlers={targetHandlers}
			header={<MessageHeader />}
			headerProps={headerProps}
		>
			<input
				value={data.message}
				id="text"
				name="text"
				placeholder="text message"
				onChange={onChange}
				className={styles.input}
			/>
		</BaseNode>
	);
};

export default MessageNode;
