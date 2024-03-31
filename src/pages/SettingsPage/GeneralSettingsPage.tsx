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
  const [gatewayHost, setGatewayHost] = useState('localhost')
  const [gatewayPort, setGatewayPort] = useState('8080')

  useEffect(() => {
    if (config === undefined) return

    // Apply default values if they don't exists
    if (config.RUN_ON_STARTUP === undefined) updateConfig('RUN_ON_STARTUP', 'false')
    if (config.LANGUAGE === undefined) updateConfig('LANGUAGE', 'en-gb')
    if (config.GATEWAY_HOST === undefined) updateConfig('GATEWAY_HOST', 'localhost')
    if (config.GATEWAY_PORT === undefined) updateConfig('GATEWAY_PORT', '8080')

    // Set the text fields to the current config values
    setGatewayHost(config.GATEWAY_HOST)
    setGatewayPort(config.GATEWAY_PORT)
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
        type={SettingType.TEXT}
        title="Set custom gateway host"
        description="Changing Perrito's host will require a restart of the application. Only change this if you know what you're doing."
        textValue={gatewayHost}
        onTextChange={e => setGatewayHost(e.target.value)}
        showSave={'onchange'}
        onSave={() => updateConfig('GATEWAY_HOST', gatewayHost)}
      />

      <Setting
        type={SettingType.TEXT}
        title="Set custom gateway port"
        description="Changing Perrito's port will require a restart of the application. Only change this if you know what you're doing."
        textValue={gatewayPort}
        onTextChange={e => setGatewayPort(e.target.value)}
        showSave={'onchange'}
        onSave={() => updateConfig('GATEWAY_PORT', gatewayPort)}
      />
    </div>
  )
}

export default GeneralSettingsPage
