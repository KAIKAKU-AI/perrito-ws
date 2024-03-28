import HeaderUtilityButton from '@components/Header/HeaderUtilityButton'

import HelpIcon from '@assets/images/icons/help.svg?react'
interface indexProps {}

const index = (props: indexProps) => {
  return (
    <HeaderUtilityButton
      icon={<HelpIcon />}
      onClick={() => {
        alert('Help button clicked')
      }}
      tooltip="Help"
    />
  )
}

export default index
