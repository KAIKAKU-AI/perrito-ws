import HelpIcon from "@assets/images/icons/help.svg?react";
import HeaderUtilityButton from "@components/Header/HeaderUtilityButton";

const index = () => {
  const handleHelpClick = () => {
    // Using the exposed function from the preload script to open the URL
    window.shell.openExternalUrl("https://github.com/KAIKAKU-AI/perrito-ws/wiki");
  };

  return <HeaderUtilityButton icon={<HelpIcon />} onClick={handleHelpClick} tooltip="Help" />;
};

export default index;
