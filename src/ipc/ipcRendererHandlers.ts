import { contextBridge, ipcRenderer } from "electron";

export function setupIpcRendererHandlers() {
	contextBridge.exposeInMainWorld("theme", {
		getTheme: () => ipcRenderer.sendSync("get-theme"),
		getThemeLiteral: () => ipcRenderer.sendSync("get-theme-literal"),
		setTheme: (theme: string) => ipcRenderer.send("set-theme", theme),
	});

	contextBridge.exposeInMainWorld("shell", {
		openExternalUrl: (url: string) => ipcRenderer.send("open-external-url", url),
	});

	contextBridge.exposeInMainWorld("app", {
		getVersion: () => ipcRenderer.sendSync("get-app-version"),
		getArch: () => ipcRenderer.sendSync("get-app-arch"),
		getPlatform: () => ipcRenderer.sendSync("get-app-platform"),
		getChromeVersion: () => ipcRenderer.sendSync("get-chrome-version"),
		getElectronVersion: () => ipcRenderer.sendSync("get-electron-version"),
	});

	contextBridge.exposeInMainWorld("config", {
		getConfig: () => ipcRenderer.invoke("get-config"),
		setConfig: (newConfig: any) => ipcRenderer.invoke("set-config", newConfig),
		updateConfig: (key: string, value: any) => ipcRenderer.invoke("update-config", key, value),
	});

	contextBridge.exposeInMainWorld("servers", {
		startServer: (id: string, name: string, host: string, port: string) =>
			ipcRenderer.invoke("start-server", id, name, host, port),
		stopServer: (id: string) => ipcRenderer.invoke("stop-server", id),
		getServers: () => ipcRenderer.invoke("get-servers"),
	});

	contextBridge.exposeInMainWorld("clients", {
		sendMessageToClient: (serverId: string, clientId: string, message: string) =>
			ipcRenderer.invoke("send-message-to-client", serverId, clientId, message),
		disconnectClient: (serverId: string, clientId: string) =>
			ipcRenderer.invoke("disconnect-client", serverId, clientId),
	});
}
