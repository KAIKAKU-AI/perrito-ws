import { BrowserWindow } from "electron";
import DaemonProcess from "src/backend/DaemonProcess";

export function setupIpcMainListeners(
  mainWindow: BrowserWindow,
  perritoDaemonProcess: DaemonProcess | null,
) {
  // Listen for messages from the child process
  perritoDaemonProcess.on("message", (message) => {
    if (message?.action == "update-renderer") {
      mainWindow.webContents.send("update-renderer", message);
    }
  });
}
