import { WebSocketServer } from 'ws'

interface WebSocketServerInstance {
  server: WebSocketServer
  port: number
}

class PerritoDaemon {
  private servers: { [key: string]: WebSocketServerInstance }

  constructor() {
    this.servers = {}
    process.on('message', this.handleMessage.bind(this))
    console.log('563939', 'PerritoDaemon started')
  }

  private handleMessage(message: any) {
    switch (message.action) {
      case 'start':
        let error = null
        try {
          this.startServer(message.id, message.host, message.port)
        } catch (e) {
          error = e.message
        }

        process.send({ correlationId: message.correlationId, data: 'Server started', error })
        break
      case 'get-servers':
        process.send({ correlationId: message.correlationId, data: this.servers })
        break
      case 'stop':
        this.stopServer(message.id)
        process.send({ correlationId: message.correlationId, data: 'Server stopped' })
        break
    }
  }

  private startServer(id: string, host: string, port: number) {
    if (this.servers[id]) {
      throw new Error(`Server with id ${id} already exists.`)
    }

    // Validate the host and port

    const server = new WebSocketServer({ host, port })
    this.servers[id] = { server, port }

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
    const instance = this.servers[id]
    if (instance) {
      instance.server.close(err => {
        if (err) {
          throw err
        }

        console.info(`Stopped WebSocket Server with id ${id}`)
      })
      delete this.servers[id]
    } else {
      throw new Error(`Server with id ${id} does not exist.`)
    }
  }
}

new PerritoDaemon()
