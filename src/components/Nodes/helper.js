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
	];
};
