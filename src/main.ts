import { BrowserWindow, app, nativeTheme } from 'electron'
import fs from 'fs'
import path from 'path'
import { setupIpcMainHandlers } from './ipc/ipcMainHandlers'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const appDataPath = app.getPath('userData')
export const appConfigPath = path.join(appDataPath, 'perrito_config.json')

// Check if the config file exists, if not, create it
if (!fs.existsSync(appConfigPath)) {
  console.warn('No previous config file found; creating a new one.')
  fs.writeFileSync(appConfigPath, JSON.stringify({}))
}

const perritoConfigFile = fs.readFileSync(appConfigPath, 'utf8')
const perritoConfig = JSON.parse(perritoConfigFile)

const createWindow = () => {
  try {
    nativeTheme.themeSource = perritoConfig.theme
  } catch (error) {
    console.warn('No previous theme setting found; using system default.')
    nativeTheme.themeSource = 'system'
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  })

  mainWindow.setMenu(null)

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  setupIpcMainHandlers()

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

console.log('Startup:', perritoConfig.RUN_ON_STARTUP === 'true')
app.setLoginItemSettings({
  openAtLogin: perritoConfig.RUN_ON_STARTUP === 'true',
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
