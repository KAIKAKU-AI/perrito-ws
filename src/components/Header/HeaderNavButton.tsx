import { Link } from 'react-router-dom'
import './header-nav-button.scss'

interface HeaderNavButtonProps {
  title: string
  icon: React.ReactNode
  onClick: () => void
  active?: boolean
}

const HeaderNavButton = (props: HeaderNavButtonProps) => {
  return (
    <Link to="/" className={`header-nav__button ${props.active ? 'active' : ''}`} onClick={props.onClick}>
      <span className="header-nav__button-icon">{props.icon}</span>
      <span className="header-nav__button-title">{props.title}</span>
    </Link>
  )
}

export default HeaderNavButton
