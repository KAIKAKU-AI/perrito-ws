import Setting, { SettingType } from '@components/Setting'
import { useConfig } from '@hooks/useConfig'
import { useEffect, useState } from 'react'
import './styles.scss'

declare global {
  interface Window {
    config: any
  }
}

const GeneralSettingsPage = () => {
  const { config, updateConfig } = useConfig()
  const [defaultServerName, setDefaultServerName] = useState('My Server')

  useEffect(() => {
    if (config === undefined) return

    // Apply default values if they don't exists
    if (config.RUN_ON_STARTUP === undefined) updateConfig('RUN_ON_STARTUP', 'false')
    if (config.LANGUAGE === undefined) updateConfig('LANGUAGE', 'en-gb')
    if (config.RANDOMIZE_SERVER_NAME === undefined) updateConfig('RANDOMIZE_SERVER_NAME', 'true')

    // Set the text fields to the current config values
    setDefaultServerName(config.DEFAULT_SERVER_NAME ?? 'My Server')
  }, [config])

  return (
    <div className="settings__main">
      <h1>General</h1>

      <Setting
        type={SettingType.SWITCH}
        title="Run Perrito on startup"
        switchChecked={config?.RUN_ON_STARTUP ?? false}
        onSwitchChange={() => updateConfig('RUN_ON_STARTUP', !config.RUN_ON_STARTUP)}
      />

      <Setting
        type={SettingType.DROPDOWN}
        title="Change language"
        description="Work in progress - more languages coming soon!"
        activeDropdownValue={config?.LANGUAGE ?? 'en-gb'}
        dropdownOptions={[{ value: 'en-gb', label: 'English UK' }]}
        onDropdownChange={e => updateConfig('LANGUAGE', e.target.value)}
      />

      <Setting
        type={SettingType.SWITCH}
        title="Random server names"
        description="Randomize the server name when creating a new server."
        switchChecked={config?.RANDOMIZE_SERVER_NAME ?? false}
        onSwitchChange={() => updateConfig('RANDOMIZE_SERVER_NAME', !config.RANDOMIZE_SERVER_NAME)}
      />

      <Setting
        type={SettingType.TEXT}
        title="Default server name"
        description="Only used when random server names are disabled."
        textValue={defaultServerName}
        showSave={'onchange'}
        onSave={() => updateConfig('DEFAULT_SERVER_NAME', defaultServerName)}
        onTextChange={e => setDefaultServerName(e.target.value)}
      />
    </div>
  )
}

export default GeneralSettingsPage
