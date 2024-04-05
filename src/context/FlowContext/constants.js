import { MarkerType } from "reactflow";

import MessageNode, {
	MessageNodeType,
} from "../../components/Nodes/MessageNode/MessageNode";

//Defult Marker End object for all edges
export const markerEnd = {
	type: MarkerType.ArrowClosed,
	height: 25,
	width: 25,
};

export const nodeTypes = { [MessageNodeType]: MessageNode };

//Helper function to get source and target node from id
export const getSourceTargetNode = ({ nodes, sourceId, targetId }) => {
	let sourceNode = null;
	let targetNode = null;

	for (let i = 0; i < nodes.length; i += 1) {
		if (sourceId === nodes[i].id) {
			sourceNode = nodes[i];
		}

		if (targetId === nodes[i].id) {
			targetNode = nodes[i];
		}

		if (sourceNode && targetNode) {
			break;
		}
	}

	return [sourceNode, targetNode];
};
