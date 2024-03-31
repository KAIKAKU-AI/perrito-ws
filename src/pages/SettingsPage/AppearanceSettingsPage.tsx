import DarkThemePreview from '@assets/images/themes/dark-theme-preview.jpg'
import LightThemePreview from '@assets/images/themes/light-theme-preview.jpg'
import SystemThemePreview from '@assets/images/themes/system-theme-preview.jpg'
import Setting, { SettingType } from '@components/Setting'
import { useConfig } from '@hooks/useConfig'
import { useEffect } from 'react'
import './styles.scss'

const AppearanceSettingsPage = () => {
  const { config, updateConfig } = useConfig()

  const themes = [
    {
      name: 'Light theme',
      value: 'light',
      preview: LightThemePreview,
    },
    {
      name: 'Dark theme',
      value: 'dark',
      preview: DarkThemePreview,
    },
    {
      name: 'System',
      value: 'system',
      preview: SystemThemePreview,
    },
  ]

  useEffect(() => {
    if (config === undefined) return

    if (config.THEME === undefined) updateConfig('THEME', 'light')

    const setTheme = async () => {
      await window.theme.setTheme(config.THEME)
    }

    setTheme()
  }, [config])

  return (
    <div className="settings__main">
      <h1>Apperance</h1>

      <Setting
        type={SettingType.THEME}
        title="Set your default theme"
        description=" Choose how Perrito looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes."
        themeOptions={themes}
        activeTheme={config?.THEME ?? 'light'}
        onThemeChange={e => updateConfig('THEME', e.target.value)}
      />
    </div>
  )
}

export default AppearanceSettingsPage
