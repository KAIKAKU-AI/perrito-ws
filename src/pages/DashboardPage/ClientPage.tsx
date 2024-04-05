import ArrowDown from "@assets/images/icons/arrow-down.svg";
import { useServers } from "@contexts/ServerContext";
import { useEffect, useState } from "react";
import { PerritoClientType } from "src/backend/daemons/PerritoTypes";

import "./styles.scss";

declare global {
	interface Window {
		clients: any;
	}
}

interface ClientPageProps {
	serverId: string;
	clientId: string;
}

interface SendMessageResponse {
	message?: string;
	level: "success" | "error" | "warning";
}

const ClientPage = (props: ClientPageProps) => {
	const { servers } = useServers();
	const [client, setClient] = useState<PerritoClientType | null>(null);
	const [sendMessageContent, setSendMessageContent] = useState<string>("");
	const [sendMessageResponse, setSendMessageResponse] = useState<SendMessageResponse>({
		message: undefined,
		level: "success",
	});

	useEffect(() => {
		const selectedServer = servers.find((server) => server.id === props.serverId);
		const selectedClient = selectedServer?.clients.find((client) => client.id === props.clientId);
		setClient(selectedClient);
	}, [servers, props.serverId, props.clientId]);

	if (!client) return null;

	const handleSendMessage = () => {
		if (!sendMessageContent) return;

		window.clients.sendMessageToClient(props.serverId, props.clientId, sendMessageContent).then(
			() => {
				setSendMessageResponse({ message: "Message sent", level: "success" });
			},
			(error: any) => {
				console.error("Error sending message:", error);
				setSendMessageResponse({ message: error.message, level: "error" });
			},
		);
	};

	const timestampAsTime = (timestamp: number) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString();
	};

	const sortedMessages = client.messages.sort((a, b) => a.timestamp - b.timestamp).reverse();

	return (
		<div>
			<div className="client-page__header">
				<div className="client-page__header-title-container">
					<h1 className="client-page__header-title">{client.id}</h1>
					<h2 className="client-page__header-subtitle">
						ws://{client.request.host}:{client.request.port}
						{client.request.path}
					</h2>
				</div>
				<div className="client-page__header-icon-button-container">
					<button
						className="client-page__button server-page__button--danger"
						onClick={() => {
							window.clients.disconnectClient(props.serverId, props.clientId).then(
								() => {
									setSendMessageResponse({ message: "Client disconnected", level: "success" });
								},
								(error: any) => {
									console.error("Error disconnecting client:", error);
									setSendMessageResponse({ message: error.message, level: "error" });
								},
							);
						}}>
						<span>Disconnect</span>
					</button>
				</div>
			</div>

			<div className="client-page__content">
				<h2 className="client-page__subtitle">Send message</h2>
				<textarea
					className="client-page__textarea"
					value={sendMessageContent}
					onChange={(e) => setSendMessageContent(e.target.value)}
					placeholder="Type a message to send to the client"
				/>

				<div className="client-page__button-container">
					<p
						className={`client-page__response client-page__response--${sendMessageResponse.level}`}>
						{sendMessageResponse.message}
					</p>

					<button className="client-page__button" onClick={handleSendMessage}>
						<span>Send</span>
					</button>
				</div>

				<h2 className="client-page__subtitle">Message history</h2>
				<div className="client-page__message-container">
					{sortedMessages.map((message, index) => (
						<div key={index} className="client-page__message-item">
							<img
								style={{
									transform: message.direction === "outbound" ? "rotate(180deg)" : "none",
								}}
								src={ArrowDown}
								className="client-page__message-item-icon"
							/>
							<span
								style={{
									wordBreak: "break-word",
									paddingRight: "1rem",
								}}>
								{message.data}
							</span>

							<span
								style={{
									marginLeft: "auto",
								}}>
								{timestampAsTime(message.timestamp)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ClientPage;
