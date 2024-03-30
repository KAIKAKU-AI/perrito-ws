interface IpcMap {
  [apiKey: string]: {
    channel: string
    sendSync: boolean
  }[]
}

export const ipcMap: IpcMap = {
  shell: [
    {
      channel: 'open-external-url',
      sendSync: false,
    },
  ],
  theme: [
    {
      channel: 'get-theme',
      sendSync: true,
    },
    {
      channel: 'get-theme-literal',
      sendSync: true,
    },
    {
      channel: 'set-theme',
      sendSync: false,
    },
  ],
}
