import MoonIcon from '@assets/images/icons/moon.svg?react'
import SunIcon from '@assets/images/icons/sun.svg?react'
import HeaderUtilityButton from '@components/Header/HeaderUtilityButton'
import { useState } from 'react'

interface indexProps {}

const index = (props: indexProps) => {
  const [isDarkMode, setIsDarkMode] = useState(window.darkMode.isDarkMode())

  let icon = isDarkMode ? <SunIcon /> : <MoonIcon />

  const handleThemeSwitch = async () => {
    await window.darkMode.toggle()
    setIsDarkMode(window.darkMode.isDarkMode())
  }

  return <HeaderUtilityButton icon={icon} onClick={handleThemeSwitch} tooltip="Switch theme" />
}

export default index
