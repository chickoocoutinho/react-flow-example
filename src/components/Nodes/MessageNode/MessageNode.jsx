import BaseNode from "../BaseNode/BaseNode";

import MessageHeader from "./MessageHeader";
import styles from "./messageNode.module.css";

import MessageSvg from "../../../assets/message-circle-lines-alt.svg";
import clsx from "clsx";

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

const MessageNode = ({ data, selected }) => {
	return (
		<BaseNode
			sourceHandlers={sourceHandlers}
			targetHandlers={targetHandlers}
			header={<MessageHeader />}
			headerProps={headerProps}
			className={clsx(selected && styles.selected)}
		>
			<p className={clsx(!data.message && styles.textGrey)}>
				{data.message ? data.message : "Click to enter message"}
			</p>
		</BaseNode>
	);
};

export const MessageNodeType = "messageNode";
export const MessageNodeIcon = MessageSvg;

export default MessageNode;
