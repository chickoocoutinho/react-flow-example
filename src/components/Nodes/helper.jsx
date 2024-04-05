import { MessageNodeIcon, MessageNodeType } from "./MessageNode/MessageNode";
import MessageNodeSettings from "./MessageNode/MessageNodeSettings";

const nodeLables = {
	[MessageNodeType]: "Message",
};

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
			label: nodeLables[MessageNodeType],
		},
	];
};

export const getNodeSettingsHeading = (messageType) => {
	let label = nodeLables[messageType];

	return label ?? "Go Back";
};

export const getNodeSettingsComponent = ({ messageType, data }) => {
	switch (messageType) {
		case MessageNodeType:
			return <MessageNodeSettings data={data} />;
		default:
			return <></>;
	}
};
