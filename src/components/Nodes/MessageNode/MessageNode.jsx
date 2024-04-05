import clsx from "clsx";

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

//Message Node extends the functionality of the Base node
const MessageNode = ({ data, selected }) => {
	return (
		<BaseNode
			sourceHandlers={sourceHandlers}
			targetHandlers={targetHandlers}
			header={<MessageHeader />}
			headerProps={headerProps}
			selected={selected}
		>
			<p className={clsx(!data.message && styles.textGrey)}>
				{data.message ? data.message : "Click to enter message"}
			</p>
		</BaseNode>
	);
};

// Each node needs to export 3 things, the Node object, node type string, and a node Icon
export const MessageNodeType = "messageNode";
export const MessageNodeIcon = MessageSvg;

export default MessageNode;
