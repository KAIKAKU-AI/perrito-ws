import { ServerClientDetails } from '@pages/ServersPage'
import { useEffect, useState } from 'react'

interface ClientPageProps {
  serverId: string
  clientId: string
}

const ClientPage = (props: ClientPageProps) => {
  const [client, setClient] = useState<ServerClientDetails | null>(null)

  useEffect(() => {
    if (!props.serverId || !props.clientId) {
      return
    }

    window.servers
      .getServers()
      .then((servers: any) => {
        console.log('057843', props)
        const selectedServer = servers[props.serverId]
        setClient(selectedServer.clients.find((client: ServerClientDetails) => client.id === props.clientId))
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
      })
  }, [])

  console.log('713566', client)

  return (
    <div>
      <h1>{client?.id}</h1>
      <p>{client?.request?.url}</p>
    </div>
  )
}

export default ClientPage
