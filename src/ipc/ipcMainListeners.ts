import { BrowserWindow } from 'electron'
import { perritoDaemonProcess } from 'src/backend/router'

export function setupIpcMainListeners(mainWindow: BrowserWindow) {
  perritoDaemonProcess.on('message', (message: any) => {
    if (message?.action == 'update-renderer') {
      console.log('516978', message)
      mainWindow.webContents.send('update-renderer', message)
    }
  })
}
