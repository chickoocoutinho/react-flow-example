import styles from "./button.module.css";

const Button = ({ children, ...props }) => {
	return (
		<button className={styles.root} {...props}>
			{children}
		</button>
	);
};

export default Button;
