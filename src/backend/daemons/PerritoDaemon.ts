import { WebSocketServer } from 'ws'

interface WebSocketServerInstance {
  server: WebSocketServer
  port: number
}

class PerritoDaemon {
  private servers: Map<string, WebSocketServerInstance>

  constructor() {
    this.servers = new Map()
    process.on('message', this.handleMessage.bind(this))
    console.log('563939', 'PerritoDaemon started')
  }

  private handleMessage(message: any) {
    switch (message.command) {
      case 'start':
        console.log('105972', { message })
        this.startServer(message.id, message.host, message.port)
        break
      case 'stop':
        this.stopServer(message.id)
        break
      // Add additional cases for other commands
    }
  }

  private startServer(id: string, host: string, port: number) {
    if (this.servers.has(id)) {
      console.error(`Server with id ${id} already exists.`)
      return
    }

    const server = new WebSocketServer({ host, port })
    this.servers.set(id, { server, port })

    server.on('connection', ws => {
      console.log(`New connection on server ${id}`)
      ws.on('message', message => {
        console.log(`Received message: ${message}`)
        // Handle incoming messages here
      })
    })

    console.log(`Started WebSocket Server on port ${port} with id ${id}`)
  }

  private stopServer(id: string) {
    const instance = this.servers.get(id)
    if (instance) {
      instance.server.close(() => {
        console.log(`Stopped WebSocket Server with id ${id}`)
      })
      this.servers.delete(id)
    } else {
      console.error(`Server with id ${id} not found.`)
    }
  }
}

const daemon = new PerritoDaemon()
