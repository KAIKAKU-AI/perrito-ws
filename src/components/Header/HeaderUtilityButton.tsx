import "./header-utility-button.scss";

interface HeaderUtilityButtonProps {
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
  active?: boolean;
}

const HeaderUtilityButton = (props: HeaderUtilityButtonProps) => {
  return (
    <button onClick={props.onClick} title={props.tooltip} className={"header-utility__button"}>
      {props.icon}
    </button>
  );
};

export default HeaderUtilityButton;
