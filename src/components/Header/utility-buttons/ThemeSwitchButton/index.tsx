import MoonIcon from "@assets/images/icons/moon.svg?react";
import SunIcon from "@assets/images/icons/sun.svg?react";
import HeaderUtilityButton from "@components/Header/HeaderUtilityButton";
import { useState } from "react";

const index = () => {
  const [theme, setTheme] = useState(window.theme.getThemeLiteral());

  const icon = theme === "dark" ? <SunIcon /> : <MoonIcon />;

  const handleThemeSwitch = async () => {
    const currentTheme = window.theme.getThemeLiteral();
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    await window.theme.setTheme(newTheme);
    setTheme(window.theme.getThemeLiteral());
  };

  return <HeaderUtilityButton icon={icon} onClick={handleThemeSwitch} tooltip="Switch theme" />;
};

export default index;
