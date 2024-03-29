import { useState } from 'react'
import SideBarControllerButton from './SideBarControllerButton'
import './styles.scss'

interface indexProps {}

const index = (props: indexProps) => {
  const [open, setOpen] = useState(true)

  return (
    <div className={`sidebar sidebar--${open ? 'open' : 'closed'}`}>
      <div className={`sidebar-content sidebar-content--${open ? 'open' : 'closed'}`}></div>
      <div className="sidebar-controller__container">
        <div className="sidebar-controller__button-container">
          <SideBarControllerButton
            onClick={() => setOpen(!open)}
            defaultArrowDirection={open ? 'center' : 'right'}
            hoverArrowDirection={open ? 'left' : 'right'}
          />
        </div>
      </div>
    </div>
  )
}

export default index
