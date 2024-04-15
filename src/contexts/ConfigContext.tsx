import { defaultConfig } from "@utils/default-config";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the structure of your configuration object here.
export interface ConfigType {
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
	setDisableKeybinds: React.Dispatch<React.SetStateAction<boolean>>;
	disableKeybinds: boolean;
}

// Creating the context with a default null value, but with specific types defined.
const ConfigContext = createContext<ConfigContextType | null>(null);

// Props type for the provider to accept children.
interface Props {
	children: ReactNode;
}

// Provider component implementation.
export const ConfigProvider: React.FC<Props> = ({ children }) => {
	const [config, setConfig] = useState<ConfigType | undefined>(defaultConfig);
	const [disableKeybinds, setDisableKeybinds] = useState(false);

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

	useEffect(() => {}, [disableKeybinds]);

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
		<ConfigContext.Provider
			value={{ config, updateConfig, setCompleteConfig, setDisableKeybinds, disableKeybinds }}>
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
