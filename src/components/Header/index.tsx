// import { ReactComponent as Logo } from "@assets/images/logos/perrito-logo.svg";

import DashboardIcon from '@assets/images/icons/dashboard.svg?react'
import ServersIcon from '@assets/images/icons/servers.svg?react'
import SettingsIcon from '@assets/images/icons/settings.svg?react'

import PerritoIcon from '@assets/images/logos/perrito-logo.svg?react'

import { useState } from 'react'
import { useTheme } from 'src/contexts/ThemeContext'
import HeaderNavButton from './HeaderNavButton'
import './styles.scss'

interface indexProps {}

const index = (props: indexProps) => {
  const [activePage, setActivePage] = useState('dashboard')

  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className={`${isDarkMode ? 'theme-dark' : 'theme-light'} header`}>
      <PerritoIcon className="header__logo" />

      <div className="header-nav__container">
        <HeaderNavButton
          icon={<DashboardIcon />}
          title="Dashboard"
          active={activePage === 'dashboard'}
          onClick={() => setActivePage('dashboard')}
        />

        <HeaderNavButton
          icon={<ServersIcon />}
          title="Servers"
          active={activePage === 'servers'}
          onClick={() => setActivePage('servers')}
        />

        <HeaderNavButton
          icon={<SettingsIcon />}
          title="Settings"
          active={activePage === 'settings'}
          onClick={() => setActivePage('settings')}
        />
      </div>

      <div className="header-utility__container"></div>
      {/* <button onClick={toggleTheme} className="header__theme-toggle">
        {isDarkMode ? '🌞' : '🌙'}
      </button> */}
    </header>
  )
}

export default index
