import { KeybindType, useConfig } from "@contexts/ConfigContext";
import { useHotkeys } from "react-hotkeys-hook";
import "./styles.scss";

interface indexProps {
	title?: string;
	isOpen?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
}

const index = (props: indexProps) => {
	const { disableKeybinds } = useConfig();

	const { config } = useConfig();
	const keybindId = "hide-show-sidebar";

	const keybind = config?.KEYBINDS.find(
		(keybind: KeybindType) => keybind.id === keybindId,
	) as KeybindType;

	useHotkeys([keybind.keybind], () => {
		if (props.setOpen) {
			disableKeybinds ? null : props.setOpen(!props.isOpen);
		}
	});

	return (
		<div className={`sidebar sidebar--${props.isOpen ? "open" : "closed"}`}>
			<div className={`sidebar-container`}>
				<div className="sidebar-content">
					{props.title && (
						<div className="sidebar-content__title">
							<h3>{props.title}</h3>
						</div>
					)}
					<div className="sidebar-content__content">{props.children}</div>
				</div>
			</div>
		</div>
	);
};

export default index;
