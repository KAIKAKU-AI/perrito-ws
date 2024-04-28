import { MessagePreset } from "@utils/presets-manager";
import { contextBridge, ipcRenderer } from "electron";
import { DaemonResponse } from "src/backend/daemons/PerritoDaemon";

export interface globalWindow {
  app: {
    getVersion: () => string;
    getArch: () => string;
    getPlatform: () => string;
    getChromeVersion: () => string;
    getElectronVersion: () => string;
  };
  theme: {
    getTheme: () => string;
    getThemeLiteral: () => string;
    setTheme: (theme: string) => void;
  };
  shell: {
    openExternalUrl: (url: string) => void;
  };
  config: {
    getConfig: () => Promise<unknown>;
    setConfig: (newConfig: unknown) => Promise<void>;
    updateConfig: (key: string, value: unknown) => Promise<void>;
  };
  presets: {
    getMessagePreset: (id: string) => Promise<unknown>;
    listMessagePresets: () => Promise<unknown>;
    saveMessagePreset: (preset: unknown) => Promise<void>;
    deleteMessagePreset: (id: string) => Promise<void>;
    updateMessagePreset: (id: string, preset: unknown) => Promise<void>;
  };
  servers: {
    startServer: (id: string, name: string, host: string, port: string) => Promise<DaemonResponse>;
    stopServer: (id: string) => Promise<void>;
    getServers: () => Promise<unknown>;
  };
  clients: {
    sendMessageToClient: (serverId: string, clientId: string, message: string) => Promise<void>;
    disconnectClient: (serverId: string, clientId: string) => Promise<void>;
  };
  daemon: {
    onUpdate: (callback: (...args: unknown[]) => void) => void;
    removeUpdateListener: (callback: (...args: unknown[]) => void) => void;
  };
}

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
    setConfig: (newConfig: Record<string, unknown>) => ipcRenderer.invoke("set-config", newConfig),
    updateConfig: (key: string, value: unknown) => ipcRenderer.invoke("update-config", key, value),
  });

  contextBridge.exposeInMainWorld("presets", {
    getMessagePreset: (id: string) => ipcRenderer.invoke("get-message-preset", id),
    listMessagePresets: () => ipcRenderer.invoke("list-message-presets"),
    saveMessagePreset: (preset: MessagePreset) => ipcRenderer.invoke("save-message-preset", preset),
    deleteMessagePreset: (id: string) => ipcRenderer.invoke("delete-message-preset", id),
    updateMessagePreset: (id: string, preset: MessagePreset) =>
      ipcRenderer.invoke("update-message-preset", id, preset),
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
