// import { ReactComponent as Logo } from "@assets/images/logos/perrito-logo.svg";

import PerritoIcon from '@assets/images/logos/perrito-logo.svg?react'
import { useTheme } from 'src/contexts/ThemeContext'
import './styles.scss'

interface indexProps {}

const index = (props: indexProps) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className={`${isDarkMode ? 'theme-dark' : 'theme-light'} header`}>
      <PerritoIcon className="header__logo" />
      {/* <button onClick={toggleTheme} className="header__theme-toggle">
        {isDarkMode ? '🌞' : '🌙'}
      </button> */}
    </header>
  )
}

export default index
