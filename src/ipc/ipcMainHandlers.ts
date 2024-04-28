import { getConfig, setConfig, updateConfig } from "@utils/config-manager";
import {
  MessagePreset,
  deletePreset,
  getPreset,
  listPresets,
  savePreset,
  updatePreset,
} from "@utils/presets-manager";
import { app, ipcMain, nativeTheme, shell } from "electron";
import DaemonProcess from "src/backend/DaemonProcess";
import {
  ipcDisconnectClient,
  ipcGetServers,
  ipcSendMessageToClient,
  ipcStartServer,
  ipcStopServer,
} from "./IpcMessageTypes";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export function setupIpcMainHandlers(perritoDaemonProcess: DaemonProcess | null) {
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
  ipcMain.handle("get-config", async () => {
    return getConfig();
  });

  ipcMain.handle("set-config", async (_, newConfig: Record<string, unknown>) => {
    setConfig(newConfig);
  });

  ipcMain.handle("update-config", async (_, key: string, value: unknown) => {
    updateConfig(key, value);
  });

  // MESSAGE PRESETS API
  ipcMain.handle("get-message-preset", async (_, id: string) => {
    return getPreset(id);
  });

  ipcMain.handle("list-message-presets", async () => {
    return listPresets();
  });

  ipcMain.handle("save-message-preset", async (_, newPreset: MessagePreset) => {
    return savePreset(newPreset);
  });

  ipcMain.handle("delete-message-preset", async (_, id: string) => {
    return deletePreset(id);
  });

  ipcMain.handle("update-message-preset", async (_, id: string, newPreset: MessagePreset) => {
    return updatePreset(id, newPreset);
  });

  // SERVER DAEMON API
  ipcMain.handle("start-server", async (_, serverId, serverName, host, port) => {
    return perritoDaemonProcess?.sendMessage({
      id: serverId,
      action: "start",
      name: serverName,
      host,
      port,
    } as ipcStartServer);
  });

  ipcMain.handle("stop-server", async (_, id) => {
    return perritoDaemonProcess?.sendMessage({
      id,
      action: "stop",
    } as ipcStopServer);
  });

  ipcMain.handle("get-servers", async () => {
    return perritoDaemonProcess?.sendMessage({
      action: "get-servers",
    } as ipcGetServers);
  });

  ipcMain.handle("send-message-to-client", async (_, serverId, clientId, message) => {
    return perritoDaemonProcess?.sendMessage({
      action: "send-message",
      serverId,
      clientId,
      message,
    } as ipcSendMessageToClient);
  });

  ipcMain.handle("disconnect-client", async (_, serverId, clientId) => {
    return perritoDaemonProcess?.sendMessage({
      action: "disconnect-client",
      serverId,
      clientId,
    } as ipcDisconnectClient);
  });
}
