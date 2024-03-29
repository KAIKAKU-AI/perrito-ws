import { truncate } from '@utils/string-formatting'
import { Link } from 'react-router-dom'
import './sidebar-navigation-button.scss'

interface SideBarNavigationButtonProps {
  title: string
  id: string
  icon?: React.ReactNode
  redirect?: string
  active?: boolean
}

const SideBarNavigationButton = (props: SideBarNavigationButtonProps) => {
  return (
    <Link to={props.redirect} className={`sidebar__navigation-button ${props.active ? 'active' : ''}`}>
      <div className="sidebar__navigation-button__title-container">
        {props.icon && <div className="sidebar__navigation-button__icon">{props.icon}</div>}
        <div className="sidebar__navigation-button__title">
          <span>{truncate(props.title, 22)}</span>
        </div>
      </div>
    </Link>
  )
}

export default SideBarNavigationButton
