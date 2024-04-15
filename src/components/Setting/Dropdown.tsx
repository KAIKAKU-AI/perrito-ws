import "./dropdown.scss";

interface DropdownProps {
	dropdownOptions?: { value: string; label: string }[];
	activeDropdownValue?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (props: DropdownProps) => {
	return (
		<select className="dropdown" value={props.activeDropdownValue ?? ""} onChange={props.onChange}>
			{props.dropdownOptions?.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
