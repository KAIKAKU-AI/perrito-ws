import Setting, { SettingType } from '@components/Setting'
import { useState } from 'react'
import './styles.scss'

interface GeneralSettingsPageProps {}

const GeneralSettingsPage = (props: GeneralSettingsPageProps) => {
  const [activeLanguage, setActiveLanguage] = useState('en')
  const [showStackTrace, setShowStackTrace] = useState(false)
  const [runOnStartup, setRunOnStartup] = useState(true)
  const [gatewayHost, setGatewayHost] = useState('localhost')
  const [gatewayPort, setGatewayPort] = useState('8080')

  return (
    <div className="settings__main">
      <h1>General</h1>

      <Setting
        type={SettingType.SWITCH}
        title="Run Perrito on startup"
        switchChecked={runOnStartup}
        onSwitchChange={() => setRunOnStartup(!runOnStartup)}
      />

      <Setting
        type={SettingType.DROPDOWN}
        title="Change language"
        description="Work in progress - more languages coming soon!"
        activeDropdownValue={activeLanguage}
        dropdownOptions={[{ value: 'en', label: 'English' }]}
        onDropdownChange={e => setActiveLanguage(e.target.value)}
      />

      <Setting
        type={SettingType.TEXT}
        title="Set custom gateway host"
        description="Changing Perrito's host will require a restart of the application. Only change this if you know what you're doing."
        textValue={gatewayHost}
        onTextChange={e => setGatewayHost(e.target.value)}
      />

      <Setting
        type={SettingType.TEXT}
        title="Set custom gateway port"
        description="Changing Perrito's port will require a restart of the application. Only change this if you know what you're doing."
        textValue={gatewayPort}
        onTextChange={e => setGatewayPort(e.target.value)}
      />

      <Setting
        type={SettingType.SWITCH}
        title="Show stack trace on error"
        description="Show the full stack trace when an error occurs. This can be useful for debugging."
        switchChecked={showStackTrace}
        onSwitchChange={() => setShowStackTrace(!showStackTrace)}
      />
    </div>
  )
}

export default GeneralSettingsPage
