import { useServers } from '@contexts/ServerContext'
import { useEffect, useState } from 'react'
import { PerritoClientType } from 'src/backend/daemons/PerritoTypes'

interface ClientPageProps {
  serverId: string
  clientId: string
}

const ClientPage = (props: ClientPageProps) => {
  const { servers } = useServers()
  const [client, setClient] = useState<PerritoClientType | null>(null)

  useEffect(() => {
    const selectedServer = servers.find(server => server.id === props.serverId)
    const selectedClient = selectedServer?.clients.find(client => client.id === props.clientId)
    setClient(selectedClient) 
    console.log("076078", selectedClient);
  }, [servers, props.serverId, props.clientId])

  return (
    <div>
      <h1>{client?.id}</h1>
      <p>{client?.request?.url}</p>
    </div>
  )
}

export default ClientPage
