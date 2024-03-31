import { getConfig, setConfig, updateConfig } from '@utils/config-manager'
import { app, ipcMain, nativeTheme, shell } from 'electron'
import { getWebSocketServers, startWebSocketServer, stopWebSocketServer } from 'src/backend/router'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export function setupIpcMainHandlers() {
  // THEME API GETTERS
  ipcMain.on('get-theme', event => {
    event.returnValue = nativeTheme.shouldUseDarkColors
  })

  ipcMain.on('get-theme-literal', event => {
    event.returnValue = nativeTheme.themeSource
  })

  // THEME API SETTERS
  ipcMain.on('set-theme', (_, theme: Theme) => {
    nativeTheme.themeSource = theme
  })

  // SHELL API SETTERS
  ipcMain.on('open-external-url', (_, url: string) => {
    shell.openExternal(url)
  })

  // APP API GETTERS
  ipcMain.on('get-app-version', event => {
    event.returnValue = app.getVersion()
  })

  ipcMain.on('get-app-arch', event => {
    event.returnValue = process.arch
  })

  ipcMain.on('get-app-platform', event => {
    event.returnValue = process.platform
  })

  ipcMain.on('get-chrome-version', event => {
    event.returnValue = process.versions.chrome
  })

  ipcMain.on('get-electron-version', event => {
    event.returnValue = process.versions.electron
  })

  // CONFIG API
  ipcMain.handle('get-config', async _ => {
    return getConfig()
  })

  ipcMain.handle('set-config', async (_, newConfig: any) => {
    setConfig(newConfig)
  })

  ipcMain.handle('update-config', async (_, key: string, value: any) => {
    updateConfig(key, value)
  })

  // SERVER DAEMON API
  ipcMain.handle('start-server', async (_, serverId, serverName, host, port) => {
    try {
      const response = await startWebSocketServer(serverId, serverName, host, parseInt(port))
      return response
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('stop-server', async (_, id) => {
    try {
      const response = await stopWebSocketServer(id)
      return response
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-servers', async _ => {
    try {
      const servers = await getWebSocketServers()
      return servers
    } catch (error) {
      throw error
    }
  })
}