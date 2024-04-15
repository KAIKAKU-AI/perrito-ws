import Button, { ButtonThemes } from "@components/Button";
import { KeybindType, useConfig } from "@contexts/ConfigContext";
import { useEffect, useState } from "react";
import "./styles.scss";

const KeybindsTable = () => {
	const { config, updateConfig, setDisableKeybinds } = useConfig();
	const [keybinds, setKeybinds] = useState<KeybindType[]>(config.KEYBINDS ?? []);
	const [editingIndex, setEditingIndex] = useState(null); // Index of the keybind currently being edited

	const handleKeybindChangeStart = (index: number) => {
		// Disable keybinds while editing
		setDisableKeybinds(true);

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
			setDisableKeybinds(false); // Re-enable keybinds

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
				{config.KEYBINDS.map((item: KeybindType, index: number) => (
					<tr key={index} title={item.id}>
						<td>{item.name}</td>
						<td>{item.keybind}</td>
						<td>
							{editingIndex === index ? (
								"Listening..."
							) : (
								<Button
									onClick={() => handleKeybindChangeStart(index)}
									theme={ButtonThemes.PRIMARY}
									style={{
										paddingTop: "0.3rem",
										paddingBottom: "0.3rem",
									}}>
									<span
										style={{
											fontSize: "0.65rem",
										}}>
										Edit
									</span>
								</Button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default KeybindsTable;
