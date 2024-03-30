import DropdownSetting from './DropdownSetting'
import SwitchSetting from './SwitchSetting'
import TextSetting from './TextSetting'
import ThemeSetting from './ThemeSetting'
import './styles.scss'

interface SettingProps {
  type: SettingType
  title: string
  description?: string
  onSwitchChange?: () => void
  onDropdownChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onThemeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  switchChecked?: boolean
  dropdownOptions?: { value: string; label: string }[]
  activeDropdownValue?: string
  textValue?: string
  themeOptions?: { name: string; value: string; preview: string }[]
  activeTheme?: string
  infoValue?: string
}

export enum SettingType {
  SWITCH,
  DROPDOWN,
  TEXT,
  THEME,
  INFO,
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

    case SettingType.THEME:
      return (
        <ThemeSetting
          title={props.title}
          description={props.description}
          onChange={props.onThemeChange}
          activeTheme={props.activeTheme}
          themeOptions={props.themeOptions}
        />
      )

    case SettingType.INFO:
      return (
        <div className="setting">
          <div className="setting-info">
            <p className="setting-info__title">{props.title}</p>
            {props.description && <p className="setting-info__description">{props.description}</p>}
          </div>

          <p>{props.infoValue}</p>
        </div>
      )
  }
}

export default index
