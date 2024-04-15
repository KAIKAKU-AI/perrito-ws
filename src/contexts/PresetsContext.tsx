import { MessagePreset } from "@utils/presets-manager";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

declare global {
	interface Window {
		presets: any;
	}
}

// Context type specifying what the context will provide.
interface MessagePresetsContextType {
	presets: MessagePreset[];
	updatePreset: (id: string, preset: MessagePreset) => Promise<void>;
	savePreset: (preset: MessagePreset) => Promise<void>;
	deletePreset: (id: string) => Promise<void>;
	getPreset: (id: string) => Promise<MessagePreset>;
}

// Creating the context with a default null value, but with specific types defined.
const MessagePresetsContext = createContext<MessagePresetsContextType | null>(null);

// Props type for the provider to accept children.
interface Props {
	children: ReactNode;
}

// Provider component implementation.
export const MessagePresetsProvider: React.FC<Props> = ({ children }) => {
	const [presets, setPresets] = useState<MessagePreset[]>([]);

	useEffect(() => {
		const loadPresets = async () => {
			try {
				const initialPresets = await window.presets.listMessagePresets();
				setPresets(initialPresets);
			} catch (error) {
				console.error("Failed to load presets.");
				setPresets([]);
			}
		};

		loadPresets();
	}, []);

	// Method to update individual config settings.
	const updatePreset = async (id: string, preset: MessagePreset) => {
		await window.presets.updateMessagePreset(id, preset);
		const newPresets = await window.presets.listMessagePresets();
		setPresets(newPresets);
	};

	// Method to set the complete configuration.
	const savePreset = async (preset: MessagePreset) => {
		await window.presets.saveMessagePreset(preset);
		const newPresets = await window.presets.listMessagePresets();
		setPresets(newPresets);
	};

	const deletePreset = async (id: string) => {
		await window.presets.deleteMessagePreset(id);
		const newPresets = await window.presets.listMessagePresets();
		setPresets(newPresets);
	};

	const getPreset = async (id: string) => {
		return window.presets.getMessagePreset(id);
	};

	// Providing the context value with the configuration object and methods to manipulate it.
	return (
		<MessagePresetsContext.Provider
			value={{
				presets,
				updatePreset,
				savePreset,
				deletePreset,
				getPreset,
			}}>
			{children}
		</MessagePresetsContext.Provider>
	);
};

// Custom hook for consuming the configuration context.
export const useMessagePresets = (): MessagePresetsContextType => {
	const context = useContext(MessagePresetsContext);
	if (!context) {
		throw new Error("useMessagePresets must be used within a MessagePresetsProvider");
	}
	return context;
};
