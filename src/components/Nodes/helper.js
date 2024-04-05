import { MessageNodeIcon, MessageNodeType } from "./MessageNode/MessageNode";

export const getNodeDefaultData = (type) => {
	switch (type) {
		case MessageNodeType:
			return {
				message: "",
			};
		default:
			return {};
	}
};

export const getAllNodeTypes = () => {
	return [
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message2",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message3",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message32",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message5",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message4",
		},
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: "Message43",
		},
	];
};
