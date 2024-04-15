import KeybindsTable from "@components/KeybindsTable";
import "./styles.scss";

interface KeyboardSettingsPageProps {}

const KeyboardSettingsPage = (props: KeyboardSettingsPageProps) => {
	return (
		<div className="settings__main">
			<div className="settings__header">
				<h1>Keyboard</h1>
			</div>

			<KeybindsTable />
		</div>
	);
};

export default KeyboardSettingsPage;
