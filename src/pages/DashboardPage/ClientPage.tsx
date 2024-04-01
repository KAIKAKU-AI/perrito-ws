import { ServerClientDetails } from '@pages/ServersPage'
import { useEffect, useState } from 'react'
import { PerritoClientType } from 'src/backend/daemons/PerritoTypes'

interface ClientPageProps {
  serverId: string
  clientId: string
}

const ClientPage = (props: ClientPageProps) => {
  const [client, setClient] = useState<PerritoClientType | null>(null)
  useEffect(() => {
    if (!props.serverId || !props.clientId) {
      return
    }
    const updateListener = (_: any, data: any) => {
      const serversData = data?.data
      const selectedServer = serversData.find((server: any) => server.id === props.serverId)
      setClient(selectedServer.clients.find((client: ServerClientDetails) => client.id === props.clientId))
    }

    window.daemon.onUpdate(updateListener)

    window.servers
      .getServers()
      .then((servers: any) => {
        const selectedServer = servers[props.serverId]
        setClient(selectedServer.clients.find((client: ServerClientDetails) => client.id === props.clientId))
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
      })

    // Cleanup
    return () => {
      window.daemon.removeUpdateListener(updateListener)
    }
  }, [])

  return (
    <div>
      <h1>{client?.id}</h1>
      <p>{client?.request?.url}</p>
    </div>
  )
}

export default ClientPage
