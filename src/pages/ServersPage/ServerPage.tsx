import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'

interface ServerPageProps {
  serverId: string
}

const ServerPage = (props: ServerPageProps) => {
  const [loading, setLoading] = useState(true)
  const [server, setServer] = useState<PerritoServerType | undefined>(undefined)

  useEffect(() => {
    window.servers
      .getServers()
      .then((servers: any) => {
        const selectedServer = servers.find((server: PerritoServerType) => server.id === props.serverId)
        setServer(selectedServer)
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
        setLoading(false)
      })
  }, [props.serverId])

  if (loading) {
    return (
      <div className="loading">
        <PulseLoader size={10} color="#000" />
      </div>
    )
  }

  return (
    <div>
      <p>{server?.host}</p>
    </div>
  )
}

export default ServerPage
