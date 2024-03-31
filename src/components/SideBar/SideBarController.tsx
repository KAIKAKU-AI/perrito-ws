import SideBarControllerButton from './SideBarControllerButton'
import './styles.scss'

interface SideBarControllerProps {
  isOpen: boolean
  onClick?: () => void
}

const SideBarController = (props: SideBarControllerProps) => {
  return (
    <div className="sidebar-controller">
      <SideBarControllerButton
        onClick={props.onClick}
        defaultArrowDirection={props.isOpen ? 'center' : 'right'}
        hoverArrowDirection={props.isOpen ? 'left' : 'right'}
      />
    </div>
  )
}

export default SideBarController
