export type ipcActionMessage =
  | ipcStartServer
  | ipcStopServer
  | ipcGetServers
  | ipcSendMessageToClient
  | ipcDisconnectClient;

export interface ipcStartServer {
  action: "start";
  id: string;
  name: string;
  host: string;
  port: number;
}

export interface ipcStopServer {
  action: "stop";
  id: string;
}

export interface ipcGetServers {
  action: "get-servers";
}

export interface ipcSendMessageToClient {
  action: "send-message";
  serverId: string;
  clientId: string;
  message: string;
}

export interface ipcDisconnectClient {
  action: "disconnect-client";
  serverId: string;
  clientId: string;
}
