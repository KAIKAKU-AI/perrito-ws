import { useState } from 'react'
import SideBarControllerButton from './SideBarControllerButton'
import './styles.scss'

interface indexProps {
  title?: string
  children?: React.ReactNode
}

const index = (props: indexProps) => {
  const [open, setOpen] = useState(true)

  return (
    <div className={`sidebar sidebar--${open ? 'open' : 'closed'}`}>
      <div className="sidebar-controller__container">
        <div className="sidebar-controller__button-container">
          <SideBarControllerButton
            onClick={() => setOpen(!open)}
            defaultArrowDirection={open ? 'center' : 'right'}
            hoverArrowDirection={open ? 'left' : 'right'}
          />
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content__title">
          <h3>{props.title}</h3>
        </div>
        <div className="sidebar-content__content">{props.children}</div>
      </div>
    </div>
  )
}

export default index
