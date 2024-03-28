import HeaderUtilityButton from '@components/Header/HeaderUtilityButton'

import MoonIcon from '@assets/images/icons/moon.svg?react'
interface indexProps {}

const index = (props: indexProps) => {
  return (
    <HeaderUtilityButton
      icon={<MoonIcon />}
      onClick={() => {
        alert('Theme Switch button clicked')
      }}
      tooltip="Switch theme"
    />
  )
}

export default index
