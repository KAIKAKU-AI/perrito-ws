import { IncomingMessage } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { PerritoClientType, PerritoServerType } from './PerritoTypes'

interface DaemonResponse {
  name: string
  message: string
}

class PerritoDaemon {
  private servers: PerritoServerType[]

  constructor() {
    this.servers = []
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

  private sendRendererUpdate() {
    // Omit the server instance from the data sent to the renderer
    const serversData = this.servers.map(server => ({
      id: server.id,
      name: server.name,
      host: server.host,
      port: server.port,
      clients: server.clients.map(client => ({
        id: client.id,
        request: client.request,
        readyState: client.socket.readyState,
        messages: client.messages,
      })), // Omit the socket from the client data
    }))

    process.send({ action: 'update-renderer', data: serversData })
  }

  private startServer(id: string, name: string, host: string, port: number): Promise<DaemonResponse> {
    return new Promise((resolve, reject) => {
      if (this.servers.find(server => server.id === id)) {
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
        this.servers.push({ id, name, host, port, clients: [], server })
        this.sendRendererUpdate()
        resolve({
          name: 'SUCCESS',
          message: `Server started successfully on ws://${host}:${port} with id ${id}`,
        } as DaemonResponse)
      })

      // Connection handling remains unchanged
      server.on('connection', (ws: WebSocket, req: IncomingMessage) => {
        // const clientData = { id: `Client_${this.servers[id].clients.length + 1}`, socket: ws, request: req }
        const server = this.servers.find(server => server.id === id)
        const clientData = {
          id: `Client_${server.clients.length + 1}`,
          request: {
            headers: req.headers,
            path: req.url || '/',
            host: server.host,
            port: server.port,
          },
          socket: ws,
          readyState: ws.readyState,
          messages: [],
        } as PerritoClientType

        server.clients.push(clientData)

        ws.on('message', message => {
          const timestamp = Date.now()

          clientData.messages.push({ timestamp, data: message.toString() })
          this.sendRendererUpdate()
        })

        ws.on('close', () => {
          clientData.readyState = ws.readyState
          this.sendRendererUpdate()
        })

        this.sendRendererUpdate()
      })

      server.on('close', () => {
        console.info(`WebSocket Server with id ${id} closed`)
        this.servers = this.servers.filter(server => server.id !== id)
      })
    })
  }

  private stopServer(id: string): Promise<DaemonResponse> {
    return new Promise((resolve, reject) => {
      const serverInstance = this.servers.find(server => server.id === id)
      if (!serverInstance) {
        return reject(new Error(`Server with id ${id} does not exist.`))
      }

      // Close all client connections
      serverInstance.clients.forEach(client => {
        client.socket.close()
      })

      serverInstance.server.close(err => {
        if (err) {
          return reject(err) // Reject the promise if there's an error closing the server
        }
        this.servers = this.servers.filter(server => server.id !== id)

        console.info(`Stopped WebSocket Server with id ${id}`)
        this.sendRendererUpdate()
        resolve({
          name: 'SUCCESS',
          message: `Server with id ${id} stopped successfully`,
        })
      })
    })
  }
}

new PerritoDaemon()
