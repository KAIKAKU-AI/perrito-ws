import PlusIcon from "@assets/images/icons/plus.svg?react";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import SideBarController from "@components/SideBar/SideBarController";
import SideBarButton from "@components/SideBar/inputs/SideBarButton";
import { useServers } from "@contexts/ServerContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PerritoServerType } from "src/backend/daemons/PerritoTypes";
import "../styles.scss";
import CreateServerPage from "./CreateServerPage";
import ServerPage from "./ServerPage";
import "./styles.scss";

declare global {
	interface Window {
		servers: any;
	}
}

const index = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const { servers } = useServers();

	const params = useParams();
	const selectedServerId = params.serverId;

	return (
		<>
			<Header activePage="servers" />
			<div id="page-content">
				<SideBar title="Servers" isOpen={sidebarOpen} setOpen={setSidebarOpen}>
					<SideBarButton
						id="create"
						title="Create"
						redirect="/servers/create"
						active={window.location.pathname === "/servers/create"}
						icon={<PlusIcon />}
						keybind="ALT+1"
					/>

					{servers?.map((server: PerritoServerType, idx: number) => {
						return (
							<SideBarButton
								key={server.id}
								title={server.name}
								id={server.id}
								active={selectedServerId === server.id}
								redirect={`/servers/${server.id}`}
								keybind={`ALT+${idx + 2}`}
							/>
						);
					})}
				</SideBar>

				<div className="page-content__container">
					<div className="page__main">
						<SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />

						{window.location.pathname === "/servers/create" && <CreateServerPage />}

						{selectedServerId && window.location.pathname !== "/servers/create" && (
							<ServerPage serverId={selectedServerId} servers={servers} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
