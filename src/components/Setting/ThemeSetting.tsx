import "./theme-setting-styles.scss";

interface ThemeSettingProps {
	title: string;
	description?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	activeTheme?: string;
	themeOptions?: { name: string; value: string; preview: string }[];
}

const ThemeSetting = (props: ThemeSettingProps) => {
	return (
		<div className="setting setting--column">
			<div className="setting-info">
				<p className="setting-info__title">{props.title}</p>
				{props.description && <p className="setting-info__description">{props.description}</p>}
			</div>

			<div className="theme-select__container">
				{props.themeOptions?.map((theme) => (
					<div
						className="theme-select__item"
						key={theme.value}
						onClick={() => {
							const input = document.getElementById(theme.value) as HTMLInputElement;
							input?.click();
						}}>
						<div className="theme-select__item-preview-container">
							<img
								className="theme-select__item-preview-image"
								src={theme.preview}
								alt={`${theme.name} theme preview`}
							/>
						</div>
						<div className="theme-select__item-info">
							<input
								type="radio"
								name="theme"
								id={theme.value}
								value={theme.value}
								checked={props.activeTheme === theme.value}
								onChange={props.onChange}
							/>
							<label htmlFor={theme.value}>{theme.name}</label>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ThemeSetting;
