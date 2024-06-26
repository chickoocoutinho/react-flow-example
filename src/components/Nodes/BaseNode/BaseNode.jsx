import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./baseNode.module.css";

//Base Node component with default styling, All other nodes can be built on top of the base nodeß
const BaseNode = ({
	sourceHandlers = [],
	targetHandlers = [],
	header,
	headerProps,
	children,
	className,
	selected,
}) => {
	return (
		<>
			{sourceHandlers.map((handler) => (
				<Handle
					type="source"
					position={Position[handler.position]}
					id={handler.id}
					key={handler.position + handler.id}
					className={clsx(
						styles.handler,
						handler?.className && handler.className
					)}
					style={handler.style}
				/>
			))}
			<div className={clsx(styles.root, className, selected && styles.selected)}>
				{header && (
					<div
						{...headerProps}
						className={clsx(
							styles.headerPadding,
							headerProps?.className && headerProps.className
						)}
					>
						{header}
					</div>
				)}

				<div className={styles.bodyPadding}>{children}</div>
			</div>
			{targetHandlers.map((handler) => (
				<Handle
					type="target"
					position={Position[handler.position]}
					id={handler.id}
					key={handler.position + handler.id}
					className={clsx(
						styles.handler,
						handler?.className && handler.className
					)}
					style={handler.style}
				/>
			))}
		</>
	);
};

export default BaseNode;

BaseNode.propTypes = {
	sourceHandlers: PropTypes.arrayOf(
		PropTypes.shape({
			position: PropTypes.oneOf(Object.keys(Position)).isRequired,
			id: PropTypes.string,
			style: PropTypes.object,
			className: PropTypes.string,
		})
	),
	targetHandlers: PropTypes.arrayOf(
		PropTypes.shape({
			position: PropTypes.oneOf(Object.keys(Position)).isRequired,
			id: PropTypes.string,
			style: PropTypes.object,
			className: PropTypes.string,
		})
	),
	header: PropTypes.node,
};
