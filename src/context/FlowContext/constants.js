import { MarkerType } from "reactflow";

import MessageNode, {
	MessageNodeType,
} from "../../components/Nodes/MessageNode/MessageNode";

export const markerEnd = {
	type: MarkerType.ArrowClosed,
	height: 25,
	width: 25,
};

export const nodeTypes = { [MessageNodeType]: MessageNode };
