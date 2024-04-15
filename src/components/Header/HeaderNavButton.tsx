import { KeybindType, useConfig } from "@contexts/ConfigContext";
import { useHotkeys } from "react-hotkeys-hook";
import { Link, useNavigate } from "react-router-dom";
import "./header-nav-button.scss";

interface HeaderNavButtonProps {
	title: string;
	icon: React.ReactNode;
	redirect?: string;
	active?: boolean;
	keybindId?: string;
}

const HeaderNavButton = (props: HeaderNavButtonProps) => {
	const navigation = useNavigate();
	const { config, disableKeybinds } = useConfig();

	const keybind = config?.KEYBINDS?.find(
		(keybind: KeybindType) => keybind.id === props.keybindId,
	) as KeybindType;

	useHotkeys([keybind.keybind], () => {
		disableKeybinds ? null : navigation(props.redirect);
	});

	return (
		<Link to={props.redirect} className={`header-nav__button ${props.active ? "active" : ""}`}>
			<span className="header-nav__button-icon">{props.icon}</span>
			<span className="header-nav__button-title">{props.title}</span>
		</Link>
	);
};

export default HeaderNavButton;
