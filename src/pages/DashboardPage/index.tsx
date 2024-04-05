import Header from "@components/Header";
import SideBar from "@components/SideBar";
import SideBarController from "@components/SideBar/SideBarController";
import SideBarButton, { CircleColor } from "@components/SideBar/inputs/SideBarButton";
import SideBarDropdown from "@components/SideBar/inputs/SideBarDropdown";
import { useServers } from "@contexts/ServerContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PerritoClientType } from "src/backend/daemons/PerritoTypes";
import "../styles.scss";
import ClientPage from "./ClientPage";
import InstructionPage from "./InstructionPage";

declare global {
	interface Window {
		servers: any;
		daemon: any;
	}
}

const index = () => {
	const params = useParams();
	const selectedServer = params.serverId;
	const selectedClient = params.clientId;

	const { servers } = useServers();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [clients, setClients] = useState<PerritoClientType[]>([]);

	useEffect(() => {
		if (selectedServer) {
			const server = servers.find((server) => server.id === selectedServer);
			if (server) {
				setClients(server.clients);
			}
		}
	}, [selectedServer, servers]);

	return (
		<>
			<Header activePage="dashboard" />
			<div id="page-content">
				<SideBar title="Clients" isOpen={sidebarOpen}>
					<SideBarDropdown
						title="Select server"
						defaultOption={{ value: "", label: "Select server" }}
						dropdownOptions={servers.map((server) => ({
							value: server.id,
							label: server.name,
						}))}
						activeDropdownValue={selectedServer ? selectedServer : ""}
						onChange={(e) => {
							window.location.href = `/dashboard/${e.target.value}`;
						}}
					/>
					{clients.map((client, index) => {
						return (
							<SideBarButton
								key={index}
								title={client.id}
								id={client.id}
								active={selectedClient === client.id}
								redirect={`/dashboard/${selectedServer}/${client.id}`}
								showCircle={true}
								circleColor={client.readyState === 1 ? CircleColor.SUCCESS : CircleColor.DANGER}
							/>
						);
					})}
				</SideBar>
				<div className="page-content__container">
					<div className="page__main">
						<SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
						{selectedClient && selectedServer && (
							<ClientPage serverId={selectedServer} clientId={selectedClient} />
						)}
						{!selectedClient && !selectedServer && (
							<InstructionPage
								title="Select a server"
								description="Use the sidebar to select a server"
							/>
						)}
						{!selectedClient && selectedServer && (
							<InstructionPage
								title="Select a client"
								description="Use the sidebar to select a client"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
