import { WebSocketServer } from 'ws'

// A simplified combination of WebSocket and IncomingMessage (serializable!)
export type PerritoClientType = {
  id: string
  request: {
    url: string
    headers: { [key: string]: string | string[] }
  }
}

// A simplified combination of WebSocketServer
export type PerritoServerType = {
  id: string
  name: string
  host: string
  port: number
  clients: PerritoClientType[]
  server: WebSocketServer
}
