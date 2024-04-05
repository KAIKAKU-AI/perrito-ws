import Setting, { SettingType } from "@components/Setting";
import { useConfig } from "@hooks/useConfig";
import { formatServerHost, formatServerName, formatServerPort } from "@utils/string-formatting";
import { useEffect, useState } from "react";
import "./styles.scss";

declare global {
	interface Window {
		config: any;
	}
}

const GeneralSettingsPage = () => {
	const { config, updateConfig } = useConfig();
	const [defaultServerName, setDefaultServerName] = useState("My Server");
	const [defaultServerHost, setDefaultServerHost] = useState("127.0.0.1");
	const [defaultServerPort, setDefaultServerPort] = useState("80");

	useEffect(() => {
		if (config === undefined) return;

		// Apply default values if they don't exists
		if (config.RUN_ON_STARTUP === undefined) updateConfig("RUN_ON_STARTUP", false);
		if (config.LANGUAGE === undefined) updateConfig("LANGUAGE", "en-gb");
		if (config.RANDOMIZE_SERVER_NAME === undefined) updateConfig("RANDOMIZE_SERVER_NAME", true);
		if (config.DEFAULT_SERVER_NAME === undefined) updateConfig("DEFAULT_SERVER_NAME", "My Server");
		if (config.DEFAULT_SERVER_HOST === undefined) updateConfig("DEFAULT_SERVER_HOST", "127.0.0.1");
		if (config.DEFAULT_SERVER_PORT === undefined) updateConfig("DEFAULT_SERVER_PORT", "80");

		// Set the text fields to the current config values
		setDefaultServerName(config.DEFAULT_SERVER_NAME ?? "My Server");
		setDefaultServerHost(config.DEFAULT_SERVER_HOST ?? "127.0.0.1");
		setDefaultServerPort(config.DEFAULT_SERVER_PORT ?? "80");
	}, [config]);

	return (
		<div className="settings__main">
			<h1>General</h1>

			<Setting
				type={SettingType.SWITCH}
				title="Run Perrito on startup"
				switchChecked={config?.RUN_ON_STARTUP ?? false}
				onSwitchChange={() => updateConfig("RUN_ON_STARTUP", !config.RUN_ON_STARTUP)}
			/>

			<Setting
				type={SettingType.DROPDOWN}
				title="Change language"
				description="Work in progress - more languages coming soon!"
				activeDropdownValue={config?.LANGUAGE ?? "en-gb"}
				dropdownOptions={[{ value: "en-gb", label: "English UK" }]}
				onDropdownChange={(e) => updateConfig("LANGUAGE", e.target.value)}
			/>

			<Setting
				type={SettingType.SWITCH}
				title="Random server names"
				description="Randomize the server name when creating a new server."
				switchChecked={config?.RANDOMIZE_SERVER_NAME ?? false}
				onSwitchChange={() => updateConfig("RANDOMIZE_SERVER_NAME", !config.RANDOMIZE_SERVER_NAME)}
			/>

			<Setting
				type={SettingType.TEXT}
				title="Default server name"
				description="Only used when random server names are disabled."
				textValue={defaultServerName}
				showSave={"onchange"}
				onSave={() => updateConfig("DEFAULT_SERVER_NAME", formatServerName(defaultServerName))}
				onTextChange={(e) => setDefaultServerName(formatServerName(e.target.value))}
				extraClasses={["large"]}
				textOptions={{
					disabled: config?.RANDOMIZE_SERVER_NAME ?? false,
				}}
			/>

			<Setting
				type={SettingType.TEXT}
				title="Default server host"
				description="The IP address or hostname of the server."
				textValue={defaultServerHost}
				showSave={"onchange"}
				onSave={() => updateConfig("DEFAULT_SERVER_HOST", formatServerHost(defaultServerHost))}
				onTextChange={(e) => setDefaultServerHost(formatServerHost(e.target.value))}
			/>

			<Setting
				type={SettingType.TEXT}
				title="Default server port"
				description="The port number of the server."
				textValue={defaultServerPort}
				showSave={"onchange"}
				onSave={() => updateConfig("DEFAULT_SERVER_PORT", formatServerPort(defaultServerPort))}
				onTextChange={(e) => setDefaultServerPort(formatServerPort(e.target.value))}
				extraClasses={["small"]}
			/>
		</div>
	);
};

export default GeneralSettingsPage;
