import { contextBridge, ipcRenderer } from "electron";

export function setupIpcRendererListeners() {
	contextBridge.exposeInMainWorld("daemon", {
		onUpdate: (callback: (...args: any[]) => void) => {
			ipcRenderer.on("update-renderer", callback);
		},
		removeUpdateListener: (callback: (...args: any[]) => void) => {
			ipcRenderer.removeListener("update-renderer", callback);
		},
	});
}
