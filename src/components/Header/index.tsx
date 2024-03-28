// import { ReactComponent as Logo } from "@assets/images/logos/perrito-logo.svg";

import PerritoIcon from '@assets/images/logos/perrito-logo.svg?react'
import './styles.scss'

interface indexProps {}

const index = (props: indexProps) => {
  return (
    <header className="header">
      <PerritoIcon className="header__logo" />
    </header>
  )
}

export default index
