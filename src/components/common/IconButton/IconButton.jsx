import clsx from "clsx";
import styles from "./iconButton.module.css";

const IconButton = ({ children, className, ...props }) => {
	return (
		<button className={clsx(styles.root, className && className)} {...props}>
			{children}
		</button>
	);
};

export default IconButton;
