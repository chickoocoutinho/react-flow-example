import Button from "../common/Button/Button";
import { getAllNodeTypes } from "../Nodes/helper";

const nodes = getAllNodeTypes();

const ControlPanel = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "0.8rem",
				flexWrap: "wrap",
				padding: "1rem",
			}}
		>
			{nodes.map((node) => (
				<Button key={node.label}>{node.label}</Button>
			))}
		</div>
	);
};

export default ControlPanel;
