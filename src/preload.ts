import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('web', {
  openExternalUrl: (url: string) => ipcRenderer.send('external-url', url),
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.send('dark-mode:toggle'),
  system: () => ipcRenderer.send('dark-mode:system'),
  isDarkMode: () => ipcRenderer.sendSync('is-dark-mode'),
})
