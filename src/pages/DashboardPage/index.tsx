import Header from "@components/Header";
import SideBar from "@components/SideBar";
import SideBarController from "@components/SideBar/SideBarController";
import SideBarButton, { CircleColor } from "@components/SideBar/inputs/SideBarButton";
import SideBarDropdown from "@components/SideBar/inputs/SideBarDropdown";
import { useServers } from "@contexts/ServerContext";
import { useConfig } from "@hooks/useConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
	const navigate = useNavigate();
	const selectedServer = params.serverId;
	const selectedClient = params.clientId;

	const {config} = useConfig();
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

	console.log("712522", config?.keybinds?.a);

	return (
		<>
			<Header activePage="dashboard" />
			<div id="page-content">
				<SideBar title="Clients" isOpen={sidebarOpen} setOpen={setSidebarOpen}>
					<SideBarDropdown
						title="Select server"
						defaultOption={{ value: "", label: "Select server" }}
						dropdownOptions={servers.map((server) => ({
							value: server.id,
							label: server.name,
						}))}
						activeDropdownValue={selectedServer ? selectedServer : ""}
						onChange={(e) => {
							// window.location.href = `/dashboard/${e.target.value}`;
							navigate(`/dashboard/${e.target.value}`);
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
								keybind={`ALT+${index + 1}`}
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
