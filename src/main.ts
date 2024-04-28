import { configExists, getConfig, resetConfig, updateConfig } from "@utils/config-manager";
import { CONFIG_VERSION } from "@utils/default-config";
import { presetsDirExists, resetPresetsDir } from "@utils/presets-manager";
import { BrowserWindow, app, nativeTheme } from "electron";
import path from "path";
import DaemonProcess from "./backend/DaemonProcess";
import { setupIpcMainHandlers } from "./ipc/ipcMainHandlers";
import { setupIpcMainListeners } from "./ipc/ipcMainListeners";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

// Check if the config file exists, if not, create it
if (!configExists()) {
	console.warn("No previous config file found. Creating new config file with default values");
	resetConfig();
}

// Check if the presets directory exists, if not, create it
if (!presetsDirExists()) {
	console.warn("No presets directory found. Creating new presets directory");
	resetPresetsDir();
}
const perritoConfig = getConfig();

if (perritoConfig?.CONFIG_VERSION !== CONFIG_VERSION) {
	console.warn("Config file version mismatch. Resetting config file to default values.");
	resetConfig();
}
const x = "fart";
let perritoDaemonProcess: DaemonProcess | null = null;

const createWindow = () => {
	try {
		nativeTheme.themeSource = perritoConfig.THEME;
	} catch (error) {
		console.warn("No previous theme setting found; using system default.");
		nativeTheme.themeSource = "system";
		updateConfig("THEME", "system");
	}

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
		},
	});

	// Remove the menu bar
	mainWindow.setMenu(null);

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}

	const daemonPath = path.join(__dirname, "PerritoDaemon.js");

	// Start the daemon process
	perritoDaemonProcess = new DaemonProcess(daemonPath);
	perritoDaemonProcess.start();

	// Setup IPC handlers and listeners
	setupIpcMainHandlers(perritoDaemonProcess);
	setupIpcMainListeners(mainWindow, perritoDaemonProcess);
};

app.on("ready", () => {
	createWindow();
});

app.setLoginItemSettings({
	openAtLogin: perritoConfig.RUN_ON_STARTUP,
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Quit the daemon process when the app is closed
app.on("before-quit", () => {
	if (perritoDaemonProcess) {
		perritoDaemonProcess.stop();
	}
});
