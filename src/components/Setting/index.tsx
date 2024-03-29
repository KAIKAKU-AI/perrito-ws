import DropdownSetting from './DropdownSetting'
import SwitchSetting from './SwitchSetting'
import TextSetting from './TextSetting'
import './styles.scss'

interface SettingProps {
  type: SettingType
  title: string
  description?: string
  onSwitchChange?: () => void
  onDropdownChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  switchChecked?: boolean
  dropdownOptions?: { value: string; label: string }[]
  activeDropdownValue?: string
  textValue?: string
}

export enum SettingType {
  SWITCH,
  DROPDOWN,
  TEXT,
}

const index = (props: SettingProps) => {
  switch (props.type) {
    case SettingType.SWITCH:
      return (
        <SwitchSetting
          title={props.title}
          description={props.description}
          onChange={props.onSwitchChange}
          checked={props.switchChecked}
        />
      )

    case SettingType.DROPDOWN:
      return (
        <DropdownSetting
          title={props.title}
          description={props.description}
          dropdownOptions={props.dropdownOptions}
          activeDropdownValue={props.activeDropdownValue}
          onChange={props.onDropdownChange}
        />
      )

    case SettingType.TEXT:
      return (
        <TextSetting
          title={props.title}
          description={props.description}
          onChange={props.onTextChange}
          value={props.textValue}
        />
      )
  }
}

export default index
