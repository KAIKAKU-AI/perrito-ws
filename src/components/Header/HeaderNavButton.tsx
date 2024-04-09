import { useHotkeys } from "react-hotkeys-hook";
import { Link, useNavigate } from "react-router-dom";
import "./header-nav-button.scss";

interface HeaderNavButtonProps {
	title: string;
	icon: React.ReactNode;
	redirect?: string;
	active?: boolean;
	keybind?: string;
}

const HeaderNavButton = (props: HeaderNavButtonProps) => {
	const navigation = useNavigate();

	useHotkeys([props.keybind], () => {
		navigation(props.redirect);
	});

	return (
		<Link to={props.redirect} className={`header-nav__button ${props.active ? "active" : ""}`}>
			<span className="header-nav__button-icon">{props.icon}</span>
			<span className="header-nav__button-title">{props.title}</span>
		</Link>
	);
};

export default HeaderNavButton;
