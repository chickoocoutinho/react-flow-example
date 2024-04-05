import { MessageNodeIcon, MessageNodeType } from "./MessageNode/MessageNode";
import MessageNodeSettings from "./MessageNode/MessageNodeSettings";

const maxEdgeCount = {
	[MessageNodeType]: {
		incoming: 1,
		outgoing: 1,
	},
};

const nodeLables = {
	[MessageNodeType]: "Message",
};

// Helper function to get the Default Data object for each node type
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

// Helper function to get an array of all node type to be displayed in the nodes panel
export const getAllNodeTypes = () => {
	return [
		{
			type: MessageNodeType,
			icon: MessageNodeIcon,
			label: nodeLables[MessageNodeType],
		},
	];
};

// Helper Function to get the hedding text of the settings panel based on node type
export const getNodeSettingsHeading = (nodeType) => {
	let label = nodeLables[nodeType];
	return label ?? "Go Back";
};

// Helper function to render content of settings panel based on node type
export const getNodeSettingsComponent = (nodeType) => {
	switch (nodeType) {
		case MessageNodeType:
			return <MessageNodeSettings />;
		default:
			return <></>;
	}
};

// Helper function to get the maximum count incoming and outgoing edges based on node type
export const getMaxIncomingOutgoingEdgeCount = (nodeType) => {
	let edgeCount = maxEdgeCount[nodeType];

	return (
		edgeCount ?? {
			incoming: 0,
			outgoing: 0,
		}
	);
};
