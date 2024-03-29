import Setting, { SettingType } from '@components/Setting'
import { useState } from 'react'
import './styles.scss'

interface GeneralSettingsPageProps {}

const GeneralSettingsPage = (props: GeneralSettingsPageProps) => {
  const [activeLanguage, setActiveLanguage] = useState('en')
  const [runOnStartup, setRunOnStartup] = useState(true)

  return (
    <div className="settings__main">
      <h1>General</h1>

      <Setting
        type={SettingType.SWITCH}
        title="Run Perrito on startup"
        switchChecked={runOnStartup}
        onChange={() => setRunOnStartup(!runOnStartup)}
      />

      <Setting
        type={SettingType.DROPDOWN}
        title="Change language"
        description="Work in progress - more languages coming soon!"
        activeDropdownValue={activeLanguage}
        dropdownOptions={[{ value: 'en', label: 'English' }]}
        onChange={e => setActiveLanguage(e.target.value)}
      />
    </div>
  )
}

export default GeneralSettingsPage
