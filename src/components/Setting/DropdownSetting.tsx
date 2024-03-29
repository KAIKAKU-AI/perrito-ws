interface DropdownSettingProps {
  title: string
  description?: string
  dropdownOptions?: { value: string; label: string }[]
  activeDropdownValue?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const DropdownSetting = (props: DropdownSettingProps) => {
  return (
    <div className="setting">
      <div className="setting-info">
        <p className="setting-info__title">{props.title}</p>
        {props.description && <p className="setting-info__description">{props.description}</p>}
      </div>
      <select className="dropdown" value={props.activeDropdownValue ?? ''} onChange={props.onChange}>
        {props.dropdownOptions?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownSetting
