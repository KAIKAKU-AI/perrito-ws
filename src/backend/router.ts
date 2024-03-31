import { fork } from 'child_process'
import path from 'path'

// Path to the compiled PerritoDaemon script, assuming TypeScript is compiled to JavaScript
const daemonPath = path.join(__dirname, 'PerritoDaemon.js')

// Fork the PerritoDaemon process
const perritoDaemonProcess = fork(daemonPath)

// Function to send commands to PerritoDaemonProcess
function sendCommandToDaemon(command: { id: string; action: 'start' | 'stop'; host?: string; port?: number }) {
  perritoDaemonProcess.send(command)
}

// Example usage of sending a command to start a new WebSocket server
export function startWebSocketServer(id: string, host: string, port: number) {
  sendCommandToDaemon({ id, action: 'start', host, port })
}

// Example usage of sending a command to stop an existing WebSocket server
export function stopWebSocketServer(id: string) {
  sendCommandToDaemon({ id, action: 'stop' })
}

export function killDaemons() {
  perritoDaemonProcess.kill()
}
