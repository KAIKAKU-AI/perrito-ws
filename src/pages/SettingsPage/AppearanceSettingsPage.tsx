import DarkThemePreview from '@assets/images/themes/dark-theme-preview.jpg'
import LightThemePreview from '@assets/images/themes/light-theme-preview.jpg'
import SystemThemePreview from '@assets/images/themes/system-theme-preview.jpg'
import Setting, { SettingType } from '@components/Setting'
import { useState } from 'react'
import './styles.scss'

interface AppearanceSettingsPageProps {}

const AppearanceSettingsPage = (props: AppearanceSettingsPageProps) => {
  const [theme, setTheme] = useState('dark')

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

  return (
    <div className="settings__main">
      <h1>Apperance</h1>

      <Setting
        type={SettingType.THEME}
        title="Change your theme"
        description=" Choose how Perrito looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes."
        themeOptions={themes}
        activeTheme={theme}
        onThemeChange={e => setTheme(e.target.value)}
      />
    </div>
  )
}

export default AppearanceSettingsPage
