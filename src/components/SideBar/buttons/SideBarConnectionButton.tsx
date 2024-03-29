import DotsIcon from '@assets/images/icons/dots.svg?react'
import { truncate } from '@utils/string-formatting'
import { Link } from 'react-router-dom'
import './sidebar-connection-button.scss'

interface SideBarConnectionButtonProps {
  title: string
  id: string
  redirect?: string
  active?: boolean
}

const SideBarConnectionButton = (props: SideBarConnectionButtonProps) => {
  console.log('968063', truncate(props.title, 24))
  return (
    <Link to={props.redirect} className={`sidebar__connection-button ${props.active ? 'active' : ''}`}>
      <div className="sidebar__connection-button__title">
        <span>{truncate(props.title, 22)}</span>
      </div>
      <button
        className="sidebar__connection-button__dots"
        onClick={e => {
          e.stopPropagation()
        }}>
        <DotsIcon />
      </button>
    </Link>
  )
}

export default SideBarConnectionButton
