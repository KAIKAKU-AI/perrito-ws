import { app, ipcMain, nativeTheme, shell } from 'electron'
import fs from 'fs'
import { themeConfigPath } from '../main'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const saveThemeSetting = (theme: string) => {
  fs.writeFileSync(themeConfigPath, JSON.stringify({ theme }))
}

export function setupIpcMainHandlers() {
  ipcMain.on('get-theme', event => {
    event.returnValue = nativeTheme.shouldUseDarkColors
  })

  ipcMain.on('get-theme-literal', event => {
    event.returnValue = nativeTheme.themeSource
  })

  ipcMain.on('set-theme', (event, theme: Theme) => {
    nativeTheme.themeSource = theme
    saveThemeSetting(theme)
  })

  ipcMain.on('open-external-url', (event, url: string) => {
    shell.openExternal(url)
  })

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
}
