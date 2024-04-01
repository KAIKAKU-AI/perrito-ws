import { WebSocket, WebSocketServer } from 'ws'

export type WebSocketMessage = {
  timestamp: number
  data: string
}

// A simplified combination of WebSocket and IncomingMessage (serializable!)
export type PerritoClientType = {
  id: string
  request: {
    url: string
    headers: { [key: string]: string | string[] }
  }
  socket: WebSocket
  messages: WebSocketMessage[]
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
