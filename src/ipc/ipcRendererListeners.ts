import { contextBridge, ipcRenderer } from "electron";

export function setupIpcRendererListeners() {
  contextBridge.exposeInMainWorld("daemon", {
    onUpdate: (callback: (...args: unknown[]) => void) => {
      ipcRenderer.on("update-renderer", callback);
    },
    removeUpdateListener: (callback: (...args: unknown[]) => void) => {
      ipcRenderer.removeListener("update-renderer", callback);
    },
  });
}
