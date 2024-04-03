import { useServers } from '@contexts/ServerContext'
import { useEffect, useState } from 'react'
import { PerritoClientType } from 'src/backend/daemons/PerritoTypes'
import './styles.scss'

interface ClientPageProps {
  serverId: string
  clientId: string
}

const ClientPage = (props: ClientPageProps) => {
  const { servers } = useServers()
  const [client, setClient] = useState<PerritoClientType | null>(null)
  const [sendMessageContent, setSendMessageContent] = useState<string>('')

  useEffect(() => {
    const selectedServer = servers.find(server => server.id === props.serverId)
    const selectedClient = selectedServer?.clients.find(client => client.id === props.clientId)
    setClient(selectedClient)
  }, [servers, props.serverId, props.clientId])

  if (!client) return null

  return (
    <div>
      <div className="client-page__header">
        <div className="client-page__header-title-container">
          <h1 className="client-page__header-title">{client.id}</h1>
          <h2 className="client-page__header-subtitle">
            ws://{client.request.host}:{client.request.port}
            {client.request.path}
          </h2>
        </div>
        <div className="client-page__header-icon-button-container">
          <button className="client-page__button server-page__button--danger" onClick={() => {}}>
            <span>Disconnect</span>
          </button>
        </div>
      </div>

      <div className="client-page__content">
        <h2 className="client-page__subtitle">Send message</h2>
        <textarea
          className="client-page__textarea"
          value={sendMessageContent}
          onChange={e => setSendMessageContent(e.target.value)}
        />

        <div className="client-page__button-container">
          <p>asf</p>
          <button className="client-page__button" onClick={() => {}}>
            <span>Send</span>
          </button>
        </div>

        <h2 className="client-page__subtitle">Message history</h2>
        <div className="client-page__message-history">
          {client.messages.map((message, index) => (
            <div key={index} className="client-page__message">
              <span>{message.data}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientPage
