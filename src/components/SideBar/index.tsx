import { useHotkeys } from "react-hotkeys-hook";
import "./styles.scss";

interface indexProps {
	title?: string;
	isOpen?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
}

const index = (props: indexProps) => {
	useHotkeys("CTRL+SHIFT+S", () => {
		if (props.setOpen) {
			props.setOpen(!props.isOpen);
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
