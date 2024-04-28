import Button, { ButtonThemes } from "@components/Button";
import { useState } from "react";
import DropdownSetting from "./DropdownSetting";
import SwitchSetting from "./SwitchSetting";
import TextSetting from "./TextSetting";
import ThemeSetting from "./ThemeSetting";
import "./styles.scss";

interface SettingProps {
  type: SettingType;
  title: string;
  description?: string;
  showSave?: "onchange" | boolean;
  onSave?: () => void;
  onSwitchChange?: () => void;
  onDropdownChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThemeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  switchChecked?: boolean;
  dropdownOptions?: { value: string; label: string }[];
  activeDropdownValue?: string;
  textValue?: string;
  themeOptions?: { name: string; value: string; preview: string }[];
  activeTheme?: string;
  infoValue?: string;
  textOptions?: React.HTMLProps<HTMLInputElement>;
  extraClasses?: string[];
}

export enum SettingType {
  SWITCH,
  DROPDOWN,
  TEXT,
  THEME,
  INFO,
}

const index = (props: SettingProps) => {
  const [showSaveButton, setShowSaveButton] = useState(props.showSave === true);

  const handleOnChange =
    (onChangeFunction?: (e: React.ChangeEvent<unknown>) => void) =>
    (e: React.ChangeEvent<unknown>) => {
      if (onChangeFunction) {
        onChangeFunction(e);
      }
      if (props.showSave === "onchange") {
        setShowSaveButton(true);
      }
    };

  const renderSaveButton = () =>
    showSaveButton ? (
      <Button
        style={{ marginLeft: "auto", marginBottom: "1rem" }}
        onClick={() => {
          props.showSave != true ? setShowSaveButton(false) : null;
          if (props.onSave) {
            props.onSave();
          }
        }}
        theme={ButtonThemes.SUCCESS}>
        <span>Save</span>
      </Button>
    ) : null;

  switch (props.type) {
    case SettingType.SWITCH:
      return (
        <div className="base__setting">
          <SwitchSetting
            title={props.title}
            description={props.description}
            onChange={props.onSwitchChange}
            checked={props.switchChecked}
          />

          {renderSaveButton()}
        </div>
      );

    case SettingType.DROPDOWN:
      return (
        <div className="base__setting">
          <DropdownSetting
            title={props.title}
            description={props.description}
            dropdownOptions={props.dropdownOptions}
            activeDropdownValue={props.activeDropdownValue}
            onChange={props.onDropdownChange}
          />

          {renderSaveButton()}
        </div>
      );

    case SettingType.TEXT:
      return (
        <div className="base__setting">
          <TextSetting
            title={props.title}
            description={props.description}
            onChange={handleOnChange(props.onTextChange)}
            value={props.textValue}
            options={props.textOptions}
            extraClasses={props.extraClasses}
          />
          {renderSaveButton()}
        </div>
      );

    case SettingType.THEME:
      return (
        <div className="base__setting">
          <ThemeSetting
            title={props.title}
            description={props.description}
            onChange={props.onThemeChange}
            activeTheme={props.activeTheme}
            themeOptions={props.themeOptions}
          />

          {renderSaveButton()}
        </div>
      );

    case SettingType.INFO:
      return (
        <div className="setting">
          <div className="setting-info">
            <p className="setting-info__title">{props.title}</p>
            {props.description && <p className="setting-info__description">{props.description}</p>}
          </div>

          <p>{props.infoValue}</p>
        </div>
      );
  }
};

export default index;
