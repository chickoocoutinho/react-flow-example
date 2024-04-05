import clsx from "clsx";
import styles from "./button.module.css";
import { forwardRef } from "react";

const Button = forwardRef(({ children, className, ...props }, ref) => {
	return (
		<button
			ref={ref}
			className={clsx(styles.root, className && className)}
			{...props}
		>
			{children}
		</button>
	);
});

export default Button;
