import { BrowserWindow } from "electron";
import { perritoDaemonProcess } from "src/backend/router";

export function setupIpcMainListeners(mainWindow: BrowserWindow) {
	perritoDaemonProcess.on("message", (message: any) => {
		if (message?.action == "update-renderer") {
			mainWindow.webContents.send("update-renderer", message);
		}
	});
}
