import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

// Interface inherits from button props
export enum ButtonThemes {
	PRIMARY = "primary",
	DANGER = "danger",
	SUCCESS = "success",
}

interface indexProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	theme: ButtonThemes;
}

const index = (props: indexProps) => {
	return (
		<button className={`button button--${props.theme}`} {...props}>
			{props.children}
		</button>
	);
};

export default index;
