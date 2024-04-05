import Button from "../common/Button/Button";
import styles from "./flow.module.css";

const SaveButton = () => {
	return (
		<div className={styles.saveButtonRoot}>
			<Button>Save Changes</Button>
		</div>
	);
};

export default SaveButton;
