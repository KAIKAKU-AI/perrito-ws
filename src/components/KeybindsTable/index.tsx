import { useConfig } from "@hooks/useConfig";
import { useEffect, useState } from "react";
import "./styles.scss";

// Mock data
const initialKeybinds = [
	{ command: "Open Dashboard Page", keybind: "Ctrl+1" },
	{ command: "Open Servers Page", keybind: "Ctrl+2" },
	{ command: "Open Settings Page", keybind: "Ctrl+3" },
	{ command: "Select Sidebar Option 1", keybind: "Alt+1" },
	{ command: "Select Sidebar Option 2", keybind: "Alt+2" },
	{ command: "Select Sidebar Option 3", keybind: "Alt+3" },
	{ command: "Select Sidebar Option 4", keybind: "Alt+4" },
	{ command: "Select Sidebar Option 5", keybind: "Alt+5" },
	{ command: "Select Sidebar Option 6", keybind: "Alt+6" },
	{ command: "Select Sidebar Option 7", keybind: "Alt+7" },
	{ command: "Select Sidebar Option 8", keybind: "Alt+8" },
	{ command: "Select Sidebar Option 9", keybind: "Alt+9" },
	{ command: "Select Sidebar Option 10", keybind: "Alt+0" },
	{ command: "Hide/Show Sidebar", keybind: "Ctrl+Shift+S" },
];

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
		console.log("180241", config);
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
					<tr key={index}>
						<td>{item.command}</td>
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
