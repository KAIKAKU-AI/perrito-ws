import DashboardIcon from "@assets/images/icons/dashboard.svg?react";
import ServersIcon from "@assets/images/icons/servers.svg?react";
import SettingsIcon from "@assets/images/icons/settings.svg?react";
import PerritoIcon from "@assets/images/logos/perrito-logo.svg?react";
import { useTheme } from "src/contexts/ThemeContext";
import HeaderNavButton from "./HeaderNavButton";
import HeaderUtilities from "./HeaderUtilities";
import "./styles.scss";

interface indexProps {
	activePage?: string;
}

const index = (props: indexProps) => {
	const { isDarkMode } = useTheme();

	return (
		<header className={`${isDarkMode ? "theme-dark" : "theme-light"} header`}>
			<PerritoIcon className="header__logo" />

			<div className="header-nav__container">
				<HeaderNavButton
					icon={<DashboardIcon />}
					title="Dashboard"
					active={props.activePage === "dashboard"}
					redirect="/"
					keybind="CTRL+1"
				/>

				<HeaderNavButton
					icon={<ServersIcon />}
					title="Servers"
					active={props.activePage === "servers"}
					redirect="/servers"
					keybind="CTRL+2"
				/>

				<HeaderNavButton
					icon={<SettingsIcon />}
					title="Settings"
					active={props.activePage === "settings"}
					redirect="/settings"
					keybind="CTRL+3"
				/>
			</div>

			<HeaderUtilities />
		</header>
	);
};

export default index;
