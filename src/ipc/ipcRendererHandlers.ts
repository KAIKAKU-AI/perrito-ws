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
}
