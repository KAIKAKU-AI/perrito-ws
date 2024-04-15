import { getConfig, setConfig, updateConfig } from "@utils/config-manager";
import {
	deletePreset,
	getPreset,
	listPresets,
	savePreset,
	updatePreset,
} from "@utils/presets-manager";
import { app, ipcMain, nativeTheme, shell } from "electron";
import {
	disconnectClient,
	getWebSocketServers,
	sendMessageToClient,
	startWebSocketServer,
	stopWebSocketServer,
} from "src/backend/router";

export enum Theme {
	LIGHT = "light",
	DARK = "dark",
	SYSTEM = "system",
}

export function setupIpcMainHandlers() {
	// THEME API GETTERS
	ipcMain.on("get-theme", (event) => {
		event.returnValue = nativeTheme.shouldUseDarkColors;
	});

	ipcMain.on("get-theme-literal", (event) => {
		event.returnValue = nativeTheme.themeSource;
	});

	// THEME API SETTERS
	ipcMain.on("set-theme", (_, theme: Theme) => {
		nativeTheme.themeSource = theme;
	});

	// SHELL API SETTERS
	ipcMain.on("open-external-url", (_, url: string) => {
		shell.openExternal(url);
	});

	// APP API GETTERS
	ipcMain.on("get-app-version", (event) => {
		event.returnValue = app.getVersion();
	});

	ipcMain.on("get-app-arch", (event) => {
		event.returnValue = process.arch;
	});

	ipcMain.on("get-app-platform", (event) => {
		event.returnValue = process.platform;
	});

	ipcMain.on("get-chrome-version", (event) => {
		event.returnValue = process.versions.chrome;
	});

	ipcMain.on("get-electron-version", (event) => {
		event.returnValue = process.versions.electron;
	});

	// CONFIG API
	ipcMain.handle("get-config", async (_) => {
		return getConfig();
	});

	ipcMain.handle("set-config", async (_, newConfig: any) => {
		setConfig(newConfig);
	});

	ipcMain.handle("update-config", async (_, key: string, value: any) => {
		updateConfig(key, value);
	});

	// MESSAGE PRESETS API
	ipcMain.handle("get-message-preset", async (_, id: string) => {
		return getPreset(id);
	});

	ipcMain.handle("list-message-presets", async (_) => {
		return listPresets();
	});

	ipcMain.handle("save-message-preset", async (_, newPreset: any) => {
		return savePreset(newPreset);
	});

	ipcMain.handle("delete-message-preset", async (_, id: string) => {
		return deletePreset(id);
	});

	ipcMain.handle("update-message-preset", async (_, id: string, newPreset: any) => {
		return updatePreset(id, newPreset);
	});

	// SERVER DAEMON API
	ipcMain.handle("start-server", async (_, serverId, serverName, host, port) => {
		try {
			return startWebSocketServer(serverId, serverName, host, parseInt(port));
		} catch (error) {
			throw error;
		}
	});

	ipcMain.handle("stop-server", async (_, id) => {
		try {
			return stopWebSocketServer(id);
		} catch (error) {
			throw error;
		}
	});

	ipcMain.handle("get-servers", async (_) => {
		try {
			return getWebSocketServers();
		} catch (error) {
			throw error;
		}
	});

	ipcMain.handle("send-message-to-client", async (_, serverId, clientId, message) => {
		try {
			return sendMessageToClient(serverId, clientId, message);
		} catch (error) {
			throw error;
		}
	});

	ipcMain.handle("disconnect-client", async (_, serverId, clientId) => {
		try {
			return disconnectClient(serverId, clientId);
		} catch (error) {
			throw error;
		}
	});
}
