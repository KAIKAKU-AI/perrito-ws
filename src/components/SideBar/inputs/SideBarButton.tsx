import DotsIcon from "@assets/images/icons/dots.svg?react";
import { truncate } from "@utils/string-formatting";
import { Link } from "react-router-dom";
import "./sidebar-button.scss";

export enum CircleColor {
	SUCCESS = "#10b57d",
	WARNING = "#ffae00",
	DANGER = "#cc4b37",
}

interface SideBarButtonProps {
	title: string;
	id: string;
	redirect?: string;
	icon?: React.ReactNode;
	active?: boolean;
	extraDropdownItems?: { title: string; onClick: () => void }[];
	showCircle?: boolean;
	circleColor?: string | CircleColor;
}

const SideBarButton = (props: SideBarButtonProps) => {
	return (
		<Link to={props.redirect} className={`sidebar-button ${props.active ? "active" : ""}`}>
			<div className="sidebar-button__title">
				{props.icon && <div className="sidebar-button__icon">{props.icon}</div>}
				{props.showCircle && (
					<div
						className="sidebar-button__circle"
						style={{ backgroundColor: props.circleColor || "" }}
					/>
				)}
				<span>{truncate(props.title, 22)}</span>
			</div>
			{props.extraDropdownItems && props.extraDropdownItems.length > 0 && (
				<button
					className="sidebar-button__dots"
					onClick={(e) => {
						e.stopPropagation();
					}}>
					<DotsIcon />
				</button>
			)}
		</Link>
	);
};

export default SideBarButton;
