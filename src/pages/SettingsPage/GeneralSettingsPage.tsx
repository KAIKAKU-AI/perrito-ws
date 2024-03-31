import Setting, { SettingType } from '@components/Setting'
import { useConfig } from '@hooks/useConfig'
import { useState } from 'react'
import './styles.scss'

declare global {
  interface Window {
    config: any
  }
}

const GeneralSettingsPage = () => {
  const { config, updateConfig } = useConfig()

  const [activeLanguage, setActiveLanguage] = useState('en-gb')
  const [showStackTrace, setShowStackTrace] = useState(false)
  const [gatewayHost, setGatewayHost] = useState('localhost')
  const [gatewayPort, setGatewayPort] = useState('8080')

  const handleRunOnStartupChange = async () => {
    if (config?.RUN_ON_STARTUP === undefined) updateConfig('RUN_ON_STARTUP', 'false')

    updateConfig('RUN_ON_STARTUP', !config.RUN_ON_STARTUP)
  }

  const handleLanguageChange = async (newLanguage: string) => {
    if (config?.LANGUAGE === undefined) updateConfig('LANGUAGE', 'en-gb')

    updateConfig('LANGUAGE', newLanguage)
  }

  return (
    <div className="settings__main">
      <h1>General</h1>

      <Setting
        type={SettingType.SWITCH}
        title="Run Perrito on startup"
        switchChecked={config?.RUN_ON_STARTUP ?? false}
        onSwitchChange={handleRunOnStartupChange}
      />

      <Setting
        type={SettingType.DROPDOWN}
        title="Change language"
        description="Work in progress - more languages coming soon!"
        activeDropdownValue={config?.LANGUAGE ?? 'en-gb'}
        dropdownOptions={[{ value: 'en-gb', label: 'English UK' }]}
        onDropdownChange={e => handleLanguageChange(e.target.value)}
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
