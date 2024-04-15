import Dropdown from "./Dropdown";

interface DropdownSettingProps {
	title: string;
	description?: string;
	dropdownOptions?: { value: string; label: string }[];
	activeDropdownValue?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownSetting = (props: DropdownSettingProps) => {
	return (
		<div className="setting">
			<div className="setting-info">
				<p className="setting-info__title">{props.title}</p>
				{props.description && <p className="setting-info__description">{props.description}</p>}
			</div>
			<Dropdown
				dropdownOptions={props.dropdownOptions}
				activeDropdownValue={props.activeDropdownValue}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default DropdownSetting;
