import Switch from 'react-switch'
import './styles.scss'

interface SettingProps {
  type: SettingType
  title: string
  description?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  dropdownOptions?: { value: string; label: string }[]
  activeDropdownValue?: string
}

export enum SettingType {
  SWITCH,
  DROPDOWN,
}

const index = (props: SettingProps) => {
  switch (props.type) {
    case SettingType.SWITCH:
      return (
        <div className="setting">
          <p>{props.title}</p>
          <Switch
            checked={true}
            onChange={() => {}}
            onColor="#2693e6"
            height={14}
            width={28}
            checkedIcon={false}
            uncheckedIcon={false}
            draggable={false}
          />
        </div>
      )

    case SettingType.DROPDOWN:
      return (
        <div className="setting">
          <div className="setting-info">
            <p className="setting-info__title">{props.title}</p>
            <p className="setting-info__description">{props.description}</p>
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
}

export default index
