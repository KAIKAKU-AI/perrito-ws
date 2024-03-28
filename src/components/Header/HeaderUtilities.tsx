import HelpButton from './utility-buttons/HelpButton'
import NotificationsButton from './utility-buttons/NotificationsButton'
import ThemeSwitchButton from './utility-buttons/ThemeSwitchButton'

interface HeaderUtilitiesProps {}

const HeaderUtilities = (props: HeaderUtilitiesProps) => {
  return (
    <div className="header-utility__container">
      <ThemeSwitchButton />
      <NotificationsButton />
      <HelpButton />
    </div>
  )
}

export default HeaderUtilities
