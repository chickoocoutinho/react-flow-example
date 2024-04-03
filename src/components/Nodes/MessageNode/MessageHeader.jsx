import MessageSvg from "../../../assets/message-circle-lines-alt.svg";
import WhatsappSvg from "../../../assets/whatsapp-color.svg";

import styles from "./messageNode.module.css";

const MessageHeader = () => {
	return (
		<>
			<div className={styles.messageHeaderStart}>
				<MessageSvg />
				<p>Send Message</p>
			</div>
			<div className={styles.messageHeaderEnd}>
				<WhatsappSvg height="100%" width="100%" />
			</div>
		</>
	);
};

export default MessageHeader;
