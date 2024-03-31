import { IncomingMessage } from 'electron'
import { WebSocket, WebSocketServer } from 'ws'

interface WebSocketServerInstance {
  name: string
  server: WebSocketServer
  host: string
  port: number
  clients: {
    id: string
    socket: WebSocket
    request: IncomingMessage
  }[]
}

interface DaemonResponse {
  name: string
  message: string
}

class PerritoDaemon {
  private servers: { [key: string]: WebSocketServerInstance }

  constructor() {
    this.servers = {}
    process.on('message', this.handleMessage.bind(this))
    console.info('PerritoDaemon started')
  }

  private handleMessage(message: any) {
    switch (message.action) {
      case 'start':
        this.startServer(message.id, message.name, message.host, message.port)
          .then(data => process.send({ correlationId: message.correlationId, data, error: null }))
          .catch(error => process.send({ correlationId: message.correlationId, data: null, error: error.message }))
        break
      case 'stop':
        this.stopServer(message.id)
          .then(data => process.send({ correlationId: message.correlationId, data, error: null }))
          .catch(error => process.send({ correlationId: message.correlationId, data: null, error: error.message }))
        break
      case 'get-servers':
        process.send({ correlationId: message.correlationId, data: this.servers })
        break
    }
  }

  private startServer(id: string, name: string, host: string, port: number): Promise<DaemonResponse> {
    return new Promise((resolve, reject) => {
      if (this.servers[id]) {
        throw new Error(`Server with id ${id} already exists.`)
      }

      // Validate the id, name, host, and port
      if (!id || !name || !host || !port) {
        throw new Error('Invalid server configuration.')
      }

      const isIdValid = /^[a-z0-9-]+$/.test(id)
      if (!isIdValid) throw new Error('Invalid server id.')

      const isNameValid = /^[a-zA-Z0-9\s]+$/.test(name)
      if (!isNameValid) throw new Error('Invalid server name.')

      const isHostValid = /^[a-zA-Z0-9\.\-]+$/.test(host)
      if (!isHostValid) throw new Error('Invalid server host.')

      if (port < 0 || port > 65535) {
        throw new Error('Invalid server port.')
      }

      const server = new WebSocketServer({ host, port })

      server.on('error', error => {
        console.error(`Error on server ${id}:`, error)
        reject(error) // Reject the promise if there's an error starting the server
      })

      // Resolve the promise once the server starts listening
      server.once('listening', () => {
        this.servers[id] = { name, server, host, port, clients: [] } // Store the server info only after successful listening
        resolve({
          name: 'SUCCESS',
          message: `Server started successfully on ws://${host}:${port} with id ${id}`,
        } as DaemonResponse)
      })

      // Connection handling remains unchanged
      server.on('connection', (ws: WebSocket, req: IncomingMessage) => {
        this.servers[id].clients.push({ id: `Client_${this.servers[id].clients.length + 1}`, socket: ws, request: req })

        ws.on('message', message => {
          // Handle incoming messages here
          console.log('383883', message)
        })

        ws.on('close', () => {
          this.servers[id].clients = this.servers[id].clients.filter(client => client.socket !== ws)
        })

        this.servers[id].server = server
      })

      server.on('close', () => {
        this.servers[id].server = server
      })
    })
  }

  private stopServer(id: string): Promise<DaemonResponse> {
    return new Promise((resolve, reject) => {
      const instance = this.servers[id]
      if (!instance) {
        return reject(new Error(`Server with id ${id} does not exist.`))
      }

      instance.server.close(err => {
        if (err) {
          return reject(err) // Reject the promise if there's an error closing the server
        }

        delete this.servers[id] // Remove the server from the tracking object after successful closure
        console.info(`Stopped WebSocket Server with id ${id}`)
        resolve({
          name: 'SUCCESS',
          message: `Server with id ${id} stopped successfully`,
        })
      })
    })
  }
}

new PerritoDaemon()
