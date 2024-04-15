import Button, { ButtonThemes } from "@components/Button";
import Setting, { SettingType } from "@components/Setting";
import DropdownSetting from "@components/Setting/DropdownSetting";
import Textarea from "@components/Textarea";
import { useMessagePresets } from "@contexts/PresetsContext";
import { MessagePreset } from "@utils/presets-manager";
import { useEffect, useState } from "react";
import "./styles.scss";

function geneateRandomId() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const PresetsSettingsPage = () => {
	const { presets, savePreset, deletePreset } = useMessagePresets();

	const [activeMessagePresetId, setActiveMessagePresetId] = useState<string>("perr-##-create");
	const [activePreset, setActivePreset] = useState<MessagePreset | null>(null);

	useEffect(() => {
		if (activeMessagePresetId === "perr-##-create") {
			setActivePreset({
				id: geneateRandomId(),
				name: "New preset",
				content: "Preset content goes here...",
			});
			return;
		}

		const preset = presets.find((preset) => preset.id === activeMessagePresetId);
		if (preset) {
			setActivePreset(preset);
		}
	}, [activeMessagePresetId]);

	return (
		<div className="settings__main">
			<div className="settings__header">
				<h1>Message presets</h1>
			</div>
			<DropdownSetting
				title="Choose a message preset:"
				onChange={(e) => {
					setActiveMessagePresetId(e.target.value);
				}}
				activeDropdownValue={activeMessagePresetId}
				description="Select a message preset to edit"
				dropdownOptions={[
					{ value: "perr-##-create", label: "Create new preset" }, // Purposefully weird value use to make it unlikely for someone to want the same message preset
					...presets.map((preset) => ({ value: preset.id, label: preset.name })),
				]}
			/>

			<Setting
				type={SettingType.TEXT}
				title="Preset name"
				description="Name of the message preset - used to identify the preset in the dropdown"
				extraClasses={["large"]}
				onTextChange={(e) => {
					setActivePreset({ ...activePreset, name: e.target.value });
				}}
				textValue={activePreset?.name || "New preset"}
			/>

			<Textarea
				value={activePreset?.content || ""}
				placeholder="Message preset content"
				onChange={(e) => {
					setActivePreset({ ...activePreset, content: e.target.value });
				}}
			/>

			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					gap: "1rem",
					marginTop: "0.5rem",
				}}>
				<Button
					theme={ButtonThemes.SUCCESS}
					onClick={() => {
						savePreset(activePreset);
					}}>
					<span>Save</span>
				</Button>

				{activeMessagePresetId === "perr-##-create" ? null : (
					<Button
						theme={ButtonThemes.DANGER}
						onClick={() => {
							deletePreset(activeMessagePresetId);
							setActiveMessagePresetId("perr-##-create");
						}}>
						<span>Delete</span>
					</Button>
				)}
			</div>
		</div>
	);
};

export default PresetsSettingsPage;
