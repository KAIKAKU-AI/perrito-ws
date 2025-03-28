import { ChangeEvent, HTMLProps } from 'react';

interface TextSettingProps {
  title: string;
  description?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  options?: HTMLProps<HTMLInputElement>;
  extraClasses?: string[];
}

const TextSetting = (props: TextSettingProps) => {
  return (
    <div className="setting">
      <div className="setting-info">
        <p className="setting-info__title">{props.title}</p>
        {props.description && <p className="setting-info__description">{props.description}</p>}
      </div>

      <input
        className={`text ${props.extraClasses ? props.extraClasses.join(' ') : ''}`}
        type="text"
        value={props.value}
        onChange={props.onChange}
        {...props.options}
      />
    </div>
  );
};

export default TextSetting;
