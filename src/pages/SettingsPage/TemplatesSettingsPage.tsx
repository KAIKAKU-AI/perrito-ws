import Button, { ButtonThemes } from "@components/Button";
import DropdownSetting from "@components/Setting/DropdownSetting";
import "./styles.scss";

interface TemplatesSettingsPageProps {}

const TemplatesSettingsPage = (props: TemplatesSettingsPageProps) => {
	return (
		<div className="settings__main">
			<div className="settings__header">
				<h1>Message presets</h1>

				<Button onClick={() => {}} theme={ButtonThemes.SUCCESS}>
					<span>Create new preset</span>
				</Button>
			</div>
			<DropdownSetting
				title="Choose a message preset:"
				onChange={(e) => console.log(e.target.value)}
				activeDropdownValue="default"
				description="Select a message preset to edit"
				dropdownOptions={[
					{ value: "default", label: "Choose a message preset" },
					{ value: "Template 2", label: "Template 2" },
					{ value: "Template 3", label: "Template 3" },
				]}
			/>
		</div>
	);
};

export default TemplatesSettingsPage;
