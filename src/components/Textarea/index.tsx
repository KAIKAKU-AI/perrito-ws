import { TextareaHTMLAttributes } from "react";
import "./styles.scss";

interface indexProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const index = (props: indexProps) => {
	return <textarea className="textarea" {...props} />;
};

export default index;
