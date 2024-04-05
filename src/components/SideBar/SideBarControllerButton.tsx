import "./sidebar-controller-button.scss";

interface SideBarControllerButtonProps {
	onClick?: () => void;
	defaultArrowDirection: "center" | "right" | "left";
	hoverArrowDirection: "center" | "right" | "left";
}

const SideBarControllerButton = (props: SideBarControllerButtonProps) => {
	// Define class names based on props
	const defaultTopRotationClass = `rotate-${props.defaultArrowDirection}`;
	const defaultBottomRotationClass = `rotate-${props.defaultArrowDirection === "left" ? "right" : props.defaultArrowDirection === "right" ? "left" : "center"}`;
	const hoverTopRotationClass = `hover-rotate-${props.hoverArrowDirection}`;
	const hoverBottomRotationClass = `hover-rotate-${props.hoverArrowDirection === "left" ? "right" : props.hoverArrowDirection === "right" ? "left" : "center"}`;

	return (
		<button className="sidebar-controller__button" onClick={props.onClick}>
			<div
				className={`sidebar-controller__button-top ${defaultTopRotationClass} ${hoverTopRotationClass}`}></div>
			<div
				className={`sidebar-controller__button-bottom ${defaultBottomRotationClass} ${hoverBottomRotationClass}`}></div>
		</button>
	);
};

export default SideBarControllerButton;
