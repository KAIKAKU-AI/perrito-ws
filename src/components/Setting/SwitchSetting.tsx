import Switch from "react-switch";

interface SwitchSettingProps {
  title: string;
  description?: string;
  checked?: boolean;
  onChange?: () => void;
}

const SwitchSetting = (props: SwitchSettingProps) => {
  return (
    <div className="setting">
      <div className="setting-info">
        <p className="setting-info__title">{props.title}</p>
        {props.description && <p className="setting-info__description">{props.description}</p>}
      </div>
      <Switch
        checked={props.checked}
        onChange={props.onChange}
        onColor="#2693e6"
        height={14}
        width={28}
        checkedIcon={false}
        uncheckedIcon={false}
        draggable={false}
      />
    </div>
  );
};

export default SwitchSetting;
