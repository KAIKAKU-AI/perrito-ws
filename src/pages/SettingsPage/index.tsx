import CogIcon from '@assets/images/icons/cog.svg?react'
import InfoIcon from '@assets/images/icons/info.svg?react'
import KeyboardIcon from '@assets/images/icons/keyboard.svg?react'
import PaletteIcon from '@assets/images/icons/palette.svg?react'
import PencilIcon from '@assets/images/icons/pencil.svg?react'
import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarNavigationButton from '@components/SideBar/buttons/SideBarNavigationButton'
import { useParams } from 'react-router-dom'
import '../styles.scss'
import AppearanceSettingsPage from './AppearanceSettingsPage'
import GeneralSettingsPage from './GeneralSettingsPage'
import KeyboardSettingsPage from './KeyboardSettingsPage'
import TemplatesSettingsPage from './TemplatesSettingsPage'

const index = () => {
  const params = useParams()
  const selectedSection = params.section

  return (
    <>
      <Header activePage="settings" />
      <div id="page-content">
        <div className="sidebar-container">
          <SideBar>
            <SideBarNavigationButton
              id="general"
              title="General"
              redirect="/settings/general"
              active={selectedSection === 'general'}
              icon={<CogIcon />}
            />
            <SideBarNavigationButton
              id="appearance"
              title="Appearance"
              redirect="/settings/appearance"
              active={selectedSection === 'appearance'}
              icon={<PaletteIcon />}
            />
            <SideBarNavigationButton
              id="keyboard"
              title="Keyboard"
              redirect="/settings/keyboard"
              active={selectedSection === 'keyboard'}
              icon={<KeyboardIcon />}
            />
            <SideBarNavigationButton
              id="templates"
              title="Templates"
              redirect="/settings/templates"
              active={selectedSection === 'templates'}
              icon={<PencilIcon />}
            />
            <SideBarNavigationButton
              id="about"
              title="About"
              redirect="/settings/about"
              active={selectedSection === 'about'}
              icon={<InfoIcon />}
            />
          </SideBar>
        </div>
        <div className="page-content__container">
          {selectedSection === 'general' && <GeneralSettingsPage />}
          {selectedSection === 'appearance' && <AppearanceSettingsPage />}
          {selectedSection === 'keyboard' && <KeyboardSettingsPage />}
          {selectedSection === 'templates' && <TemplatesSettingsPage />}
          {selectedSection === 'about' && <div>About Settings</div>}
        </div>
      </div>
    </>
  )
}

export default index
