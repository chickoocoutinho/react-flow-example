import BaseNode from "../BaseNode/BaseNode";

import MessageHeader from "./MessageHeader";
import styles from "./messageNode.module.css";

import MessageSvg from "../../../assets/message-circle-lines-alt.svg";

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

const MessageNode = ({ data }) => {
	return (
		<BaseNode
			sourceHandlers={sourceHandlers}
			targetHandlers={targetHandlers}
			header={<MessageHeader />}
			headerProps={headerProps}
		>
			<p>{data.message}</p>
		</BaseNode>
	);
};

export const MessageNodeType = "messageNode";
export const MessageNodeIcon = MessageSvg;

export default MessageNode;
