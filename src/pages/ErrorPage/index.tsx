import PerritoSad from "@assets/images/perrito/perrito-sad.svg?react";
import Header from "@components/Header";
import { useConfig } from "@hooks/useConfig";
import { useLocation, useRouteError } from "react-router-dom";
import "../styles.scss";
import "./error-page.scss";

const index = () => {
	const error = useRouteError() as any;
	const location = useLocation();

	const { config } = useConfig();

	return (
		<>
			<Header />
			<div id="page-content">
				<div className="error-container">
					<div className="error-container__image">
						<PerritoSad />
					</div>
					<div className="error-container__info">
						<h1>
							{error.status}
							{error.status && <>&nbsp;&nbsp;</>}
							{error.statusText ?? "An error occurred!"}
						</h1>
						<p>{error.message}</p>
						<code>Location: {location.pathname}</code>
						{error.data && <code>{error.data}</code>}

						{/* TODO: Implement settings to show stack on error (should be off by default) */}
						{/* {error.error.stack && <code>{error.error.stack}</code>} */}
						{config?.SHOW_STACK_TRACE && error?.stack && (
							<>
								<br />
								<code>{error.stack}</code>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
