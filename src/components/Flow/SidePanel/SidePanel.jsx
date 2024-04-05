import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import clsx from "clsx";

import FlowContext from "../../../context/FlowContext/FlowContext";
import NodelPanel from "./NodelPanel";
import styles from "./sidePanel.module.css";
import SettingsPanel from "./SettingsPanel";

import ChevronSvg from "../../../assets/left-chevron.svg";

const SidePanel = () => {
	const tabView = useMediaQuery("(max-width: 768px)");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (tabView) {
			//Keep panel closed by default
			setIsOpen(false);
		}
	}, [tabView]);

	const { selectedNode } = useContext(FlowContext);
	//View is toggled between settings panel and nodes panel based on selectedNode

	const handleSidePanelToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSidePanelClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{
				// Toggle side panel is and out on smaller screens
				tabView && (
					<div className={styles.toggleIcon} onClick={handleSidePanelToggle}>
						<ChevronSvg
							height="1.5rem"
							className={clsx(
								isOpen ? styles.chevronRight : styles.chevronLeft
							)}
						/>
					</div>
				)
			}
			<div
				className={clsx(
					styles.sidePanelRoot,
					tabView && (isOpen ? styles.sidePanelOpen : styles.sidePanelClose)
				)}
			>
				<div>
					{selectedNode ? (
						<SettingsPanel />
					) : (
						<NodelPanel handleSidePanelClose={handleSidePanelClose} />
					)}
				</div>
			</div>
		</>
	);
};

export default SidePanel;
