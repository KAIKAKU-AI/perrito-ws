import { contextBridge, ipcRenderer } from 'electron'

export function setupIpcRendererHandlers() {
  contextBridge.exposeInMainWorld('theme', {
    getTheme: () => ipcRenderer.sendSync('get-theme'),
    getThemeLiteral: () => ipcRenderer.sendSync('get-theme-literal'),
    setTheme: (theme: string) => ipcRenderer.send('set-theme', theme),
  })

  contextBridge.exposeInMainWorld('shell', {
    openExternalUrl: (url: string) => ipcRenderer.send('open-external-url', url),
  })

  contextBridge.exposeInMainWorld('app', {
    getVersion: () => ipcRenderer.sendSync('get-app-version'),
    getArch: () => ipcRenderer.sendSync('get-app-arch'),
    getPlatform: () => ipcRenderer.sendSync('get-app-platform'),
    getChromeVersion: () => ipcRenderer.sendSync('get-chrome-version'),
    getElectronVersion: () => ipcRenderer.sendSync('get-electron-version'),
  })

  contextBridge.exposeInMainWorld('config', {
    getConfig: () => ipcRenderer.invoke('get-config'),
    setConfig: (newConfig: any) => ipcRenderer.invoke('set-config', newConfig),
    updateConfig: (key: string, value: any) => ipcRenderer.invoke('update-config', key, value),
  })

  contextBridge.exposeInMainWorld('servers', {
    startServer: (serverName: string, host: string, port: number) =>
      ipcRenderer.send('start-server', serverName, host, port),
    stopServer: (serverName: string) => ipcRenderer.send('stop-server', serverName),
    getServers: () => ipcRenderer.sendSync('get-servers'),
  })
}
