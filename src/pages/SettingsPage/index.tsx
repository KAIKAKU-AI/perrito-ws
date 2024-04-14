import CogIcon from "@assets/images/icons/cog.svg?react";
import InfoIcon from "@assets/images/icons/info.svg?react";
import KeyboardIcon from "@assets/images/icons/keyboard.svg?react";
import PaletteIcon from "@assets/images/icons/palette.svg?react";
import PencilIcon from "@assets/images/icons/pencil.svg?react";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import SideBarButton from "@components/SideBar/inputs/SideBarButton";
import { useParams } from "react-router-dom";
import "../styles.scss";
import AboutSettingsPage from "./AboutSettingsPage";
import AppearanceSettingsPage from "./AppearanceSettingsPage";
import GeneralSettingsPage from "./GeneralSettingsPage";
import KeyboardSettingsPage from "./KeyboardSettingsPage";
import TemplatesSettingsPage from "./TemplatesSettingsPage";

const index = () => {
	const params = useParams();
	const selectedSection = params.section;

	return (
		<>
			<Header activePage="settings" />
			<div id="page-content">
				<SideBar isOpen>
					<SideBarButton
						id="general"
						title="General"
						redirect="/settings/general"
						active={selectedSection === "general"}
						icon={<CogIcon />}
						keybindId="select-sidebar-option-1"
					/>
					<SideBarButton
						id="appearance"
						title="Appearance"
						redirect="/settings/appearance"
						active={selectedSection === "appearance"}
						icon={<PaletteIcon />} 
						keybindId="select-sidebar-option-2"
					/>
					<SideBarButton
						id="keyboard"
						title="Keyboard"
						redirect="/settings/keyboard"
						active={selectedSection === "keyboard"}
						icon={<KeyboardIcon />}
						keybindId="select-sidebar-option-3"
					/>
					<SideBarButton
						id="templates"
						title="Templates"
						redirect="/settings/templates"
						active={selectedSection === "templates"}
						icon={<PencilIcon />}
						keybindId="select-sidebar-option-4"
					/>
					<SideBarButton
						id="about"
						title="About"
						redirect="/settings/about"
						active={selectedSection === "about"}
						icon={<InfoIcon />}
						keybindId="select-sidebar-option-5"
					/>
				</SideBar>
				<div className="page-content__container">
					{selectedSection === "general" && <GeneralSettingsPage />}
					{selectedSection === "appearance" && <AppearanceSettingsPage />}
					{selectedSection === "keyboard" && <KeyboardSettingsPage />}
					{selectedSection === "templates" && <TemplatesSettingsPage />}
					{selectedSection === "about" && <AboutSettingsPage />}
				</div>
			</div>
		</>
	);
};

export default index;
