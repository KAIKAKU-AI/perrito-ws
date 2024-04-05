import PerritoConfused from "@assets/images/perrito/perrito-confused.svg";
import "./styles.scss";

interface InstructionPageProps {
	title?: string;
	description?: string;
}

const InstructionPage = (props: InstructionPageProps) => {
	return (
		<div className="instruction-page">
			<div className="instruction-page__perrito">
				<img src={PerritoConfused} alt="Perrito confused" />
			</div>
			{props.title && <h1 className="instruction-page__title">{props.title}</h1>}
			{props.description && <p className="instruction-page__description">{props.description}</p>}
		</div>
	);
};

export default InstructionPage;
