import DotsIcon from '@assets/images/icons/dots.svg?react'
import './sidebar-connection-button.scss'
interface SideBarConnectionButtonProps {
  title: string
  id: string
  active?: boolean
  onClick: () => void
}

const SideBarConnectionButton = (props: SideBarConnectionButtonProps) => {
  return (
    <div className={`sidebar__connection-button ${props.active ? 'active' : ''}`} onClick={props.onClick}>
      <div className="sidebar__connection-button__title">
        <span>{props.title}</span>
      </div>
      <button
        className="sidebar__connection-button__dots"
        onClick={e => {
          e.stopPropagation()
          console.log('048129')
        }}>
        <DotsIcon />
      </button>
    </div>
  )
}

export default SideBarConnectionButton
