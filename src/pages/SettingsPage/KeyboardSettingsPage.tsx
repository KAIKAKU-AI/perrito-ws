import KeybindsTable from "@components/KeybindsTable";
import "./styles.scss";

interface KeyboardSettingsPageProps {}

const KeyboardSettingsPage = (props: KeyboardSettingsPageProps) => {
	return (
		<div className="settings__main">
			<h1>Keyboard</h1>

			<KeybindsTable />
		</div>
	);
};

export default KeyboardSettingsPage;
