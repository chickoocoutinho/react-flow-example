import styles from "./errorToast.module.css";

const ErrorToast = ({ children }) => {
	return <div className={styles.root}>{children}</div>;
};

export default ErrorToast;
