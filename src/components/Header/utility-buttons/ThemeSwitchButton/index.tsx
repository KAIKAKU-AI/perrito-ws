import MoonIcon from '@assets/images/icons/moon.svg?react'
import SunIcon from '@assets/images/icons/sun.svg?react'
import HeaderUtilityButton from '@components/Header/HeaderUtilityButton'
import { useTheme } from '@contexts/ThemeContext'

interface indexProps {}

const index = (props: indexProps) => {
  const { isDarkMode, toggleTheme } = useTheme()

  let icon = isDarkMode ? <SunIcon /> : <MoonIcon />

  return <HeaderUtilityButton icon={icon} onClick={toggleTheme} tooltip="Switch theme" />
}

export default index
