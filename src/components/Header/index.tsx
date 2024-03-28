// import { ReactComponent as Logo } from "@assets/images/logos/perrito-logo.svg";

import Logo from '@assets/images/logos/perrito-logo.svg?react'

interface indexProps {}

const index = (props: indexProps) => {
  return (
    <header>
      <Logo />
    </header>
  )
}

export default index
