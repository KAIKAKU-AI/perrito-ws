import DotsIcon from '@assets/images/icons/dots.svg?react'
import { truncate } from '@utils/string-formatting'
import { Link } from 'react-router-dom'
import './sidebar-button.scss'

interface SideBarConnectionButtonProps {
  title: string
  id: string
  redirect?: string
  icon?: React.ReactNode
  active?: boolean
  extraDropdownItems?: { title: string; onClick: () => void }[]
}

const SideBarButton = (props: SideBarConnectionButtonProps) => {
  return (
    <Link to={props.redirect} className={`sidebar-button ${props.active ? 'active' : ''}`}>
      <div className="sidebar-button__title">
        {props.icon && <div className="sidebar-button__icon">{props.icon}</div>}
        <span>{truncate(props.title, 22)}</span>
      </div>
      {props.extraDropdownItems && props.extraDropdownItems.length > 0 && (
        <button
          className="sidebar-button__dots"
          onClick={e => {
            e.stopPropagation()
          }}>
          <DotsIcon />
        </button>
      )}
    </Link>
  )
}

export default SideBarButton
