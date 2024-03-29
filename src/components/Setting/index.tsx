import DropdownSetting from './DropdownSetting'
import SwitchSetting from './SwitchSetting'
import './styles.scss'

interface SettingProps {
  type: SettingType
  title: string
  description?: string
  onChange?: () => void
  switchChecked?: boolean
  dropdownOptions?: { value: string; label: string }[]
  activeDropdownValue?: string
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
          onChange={props.onChange}
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
          onChange={props.onChange}
        />
      )
  }
}

export default index
