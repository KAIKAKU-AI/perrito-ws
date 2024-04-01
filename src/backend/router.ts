import { fork } from 'child_process'
import path from 'path'

// Path to the compiled PerritoDaemon script, assuming TypeScript is compiled to JavaScript
const daemonPath = path.join(__dirname, 'PerritoDaemon.js')

// Fork the PerritoDaemon process
export const perritoDaemonProcess = fork(daemonPath)

interface PendingRequests {
  [key: string]: { resolve: Function; reject: Function }
}

const pendingRequests = {} as PendingRequests

function sendCommandToDaemon(command: { id?: string; action: string; name?: string; host?: string; port?: number }) {
  const correlationId = Date.now().toString() + Math.random().toString().substring(2)
  const commandWithCorrelationId = { ...command, correlationId }

  // Send the command with the correlationId to the child process
  perritoDaemonProcess.send(commandWithCorrelationId)

  // Return a promise that will be resolved or rejected when the child process responds
  return new Promise((resolve, reject) => {
    // Store the resolve and reject functions using the correlationId as the key
    pendingRequests[correlationId] = { resolve, reject }

    // Implement timeout or error handling as needed
  })
}

// Listen for messages from the child process
perritoDaemonProcess.on('message', (message: any) => {
  if (message.correlationId && pendingRequests[message.correlationId]) {
    // Resolve or reject the promise based on the message content
    if (message.error) {
      pendingRequests[message.correlationId].reject(message.error)
    } else {
      pendingRequests[message.correlationId].resolve(message.data)
    }
    // Clean up after handling the response
    delete pendingRequests[message.correlationId]
  }
})

// Example usage of sending a command to start a new WebSocket server
export function startWebSocketServer(id: string, name: string, host: string, port: number) {
  return sendCommandToDaemon({ id, action: 'start', name, host, port })
}

// Example usage of sending a command to stop an existing WebSocket server
export function stopWebSocketServer(id: string) {
  return sendCommandToDaemon({ id, action: 'stop' })
}
export function getWebSocketServers() {
  return sendCommandToDaemon({ action: 'get-servers' })
}

export function killDaemons() {
  perritoDaemonProcess.kill()
}
