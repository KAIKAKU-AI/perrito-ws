import { KeybindType, useConfig } from "@contexts/ConfigContext";
import { useEffect, useState } from "react";
import "./styles.scss";

// Mock data
const initialKeybinds = [
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
] as KeybindType[];

const KeybindsTable = () => {
	const { config, updateConfig } = useConfig();
	const [keybinds, setKeybinds] = useState(initialKeybinds);
	const [editingIndex, setEditingIndex] = useState(null); // Index of the keybind currently being edited

	const handleKeybindChangeStart = (index: number) => {
		setEditingIndex(index);
		// Function to determine if the pressed key is a modifier key
		const isModifierKey = (key: string) => {
			return ["Control", "Shift", "Alt", "Meta"].includes(key);
		};

		const handleKeyPress = (event: KeyboardEvent) => {
			// Prevent capturing just the modifier key (e.g., 'Control')
			if (isModifierKey(event.key)) return;

			// Construct the new keybind string
			let newKeybind = "";
			if (event.ctrlKey) newKeybind += "Ctrl+";
			if (event.shiftKey) newKeybind += "Shift+";
			if (event.altKey) newKeybind += "Alt+";
			if (event.metaKey) newKeybind += "Meta+";
			newKeybind += event.key.toUpperCase();

			// Update the keybinds state
			const updatedKeybinds = [...keybinds];
			updatedKeybinds[index].keybind = newKeybind;
			setKeybinds(updatedKeybinds);
			setEditingIndex(null); // Exit editing mode

			// Update the config
			const updatedConfig = { ...config };
			updatedConfig.KEYBINDS = updatedKeybinds;
			updateConfig("KEYBINDS", updatedKeybinds);

			// Remove the event listener to prevent multiple captures
			document.removeEventListener("keydown", handleKeyPress);
		};

		document.addEventListener("keydown", handleKeyPress);
	};

	useEffect(() => {
		if (config === undefined) return;

		if (config.KEYBINDS === undefined) updateConfig("KEYBINDS", {});
	}, [config]);

	return (
		<table className="keybinds-table">
			<thead>
				<tr>
					<th>Command</th>
					<th>Keybind</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{keybinds.map((item, index) => (
					<tr key={index} title={item.id}>
						<td>{item.name}</td>
						<td>{item.keybind}</td>
						<td>
							{editingIndex === index ? (
								"Listening..."
							) : (
								<button
									className="keybinds-table__button"
									onClick={() => handleKeybindChangeStart(index)}>
									Edit
								</button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default KeybindsTable;
