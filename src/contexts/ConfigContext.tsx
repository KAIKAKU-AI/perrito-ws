import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the structure of your configuration object here.
interface ConfigType {
	[key: string]: any; // Replace 'any' with more specific types as needed.
}

export interface KeybindType {
	id: string;
	name: string;
	keybind: string;
}

// Context type specifying what the context will provide.
interface ConfigContextType {
	config: ConfigType | undefined;
	updateConfig: (key: string, value: any) => Promise<void>;
	setCompleteConfig: (newConfig: ConfigType) => Promise<void>;
}

// Creating the context with a default null value, but with specific types defined.
const ConfigContext = createContext<ConfigContextType | null>(null);

// Props type for the provider to accept children.
interface Props {
	children: ReactNode;
}

const defaultConfig: ConfigType = {
	THEME: "system",
	RUN_ON_STARTUP: false,
	LANGUAGE: "en-gb",
	SHOW_STACK_TRACE: true,
	GATEWAY_HOST: "localhost",
	GATEWAY_PORT: "8080",
	RANDOMIZE_SERVER_NAME: true,
	DEFAULT_SERVER_NAME: "My Server",
	DEFAULT_SERVER_PORT: "80",
	DEFAULT_SERVER_HOST: "127.0.0.1",
	KEYBINDS: [
		{ id: "open-dashboard-page", name: "Open Dashboard Page", keybind: "Ctrl+1" },
		{ id: "open-servers-page", name: "Open Servers Page", keybind: "Ctrl+2" },
		{ id: "open-settings-page", name: "Open Settings Page", keybind: "Ctrl+3" },
		{ id: "select-sidebar-option-1", name: "Select Sidebar Option 1", keybind: "Alt+1" },
		{ id: "select-sidebar-option-2", name: "Select Sidebar Option 2", keybind: "Alt+2" },
		{ id: "select-sidebar-option-3", name: "Select Sidebar Option 3", keybind: "Alt+3" },
		{ id: "select-sidebar-option-4", name: "Select Sidebar Option 4", keybind: "Alt+4" },
		{ id: "select-sidebar-option-5", name: "Select Sidebar Option 5", keybind: "Alt+5" },
		{ id: "select-sidebar-option-6", name: "Select Sidebar Option 6", keybind: "Alt+6" },
		{ id: "select-sidebar-option-7", name: "Select Sidebar Option 7", keybind: "Alt+7" },
		{ id: "select-sidebar-option-8", name: "Select Sidebar Option 8", keybind: "Alt+8" },
		{ id: "select-sidebar-option-9", name: "Select Sidebar Option 9", keybind: "Alt+9" },
		{ id: "select-sidebar-option-10", name: "Select Sidebar Option 10", keybind: "Alt+0" },
		{ id: "hide-show-sidebar", name: "Hide/Show Sidebar", keybind: "Ctrl+Shift+S" },
	] as KeybindType[],
};

// Provider component implementation.
export const ConfigProvider: React.FC<Props> = ({ children }) => {
	const [config, setConfig] = useState<ConfigType | undefined>(defaultConfig);

	useEffect(() => {
		// Assume `window.config.getConfig()` fetches configuration settings.
		const loadConfig = async () => {
			try {
				const initialConfig: ConfigType = await window.config.getConfig();
				setConfig(initialConfig);
			} catch (error) {
				console.error("Failed to load configuration settings - factory reset.");
				await window.config.setConfig(defaultConfig);
			}
		};

		loadConfig();
	}, []);

	// Method to update individual config settings.
	const updateConfig = async (key: string, value: any) => {
		await window.config.updateConfig(key, value);
		const updatedConfig: ConfigType = await window.config.getConfig();
		setConfig(updatedConfig);
	};

	// Method to set the complete configuration.
	const setCompleteConfig = async (newConfig: ConfigType) => {
		await window.config.setConfig(newConfig);
		setConfig(newConfig);
	};

	// Providing the context value with the configuration object and methods to manipulate it.
	return (
		<ConfigContext.Provider value={{ config, updateConfig, setCompleteConfig }}>
			{children}
		</ConfigContext.Provider>
	);
};

// Custom hook for consuming the configuration context.
export const useConfig = (): ConfigContextType => {
	const context = useContext(ConfigContext);
	if (!context) {
		throw new Error("useConfig must be used within a ConfigProvider");
	}
	return context;
};
