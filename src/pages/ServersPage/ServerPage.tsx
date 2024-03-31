import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ServerDetails } from '.'

interface ServerPageProps {
  serverId: string
}

const ServerPage = (props: ServerPageProps) => {
  const [loading, setLoading] = useState(true)
  const [server, setServer] = useState<ServerDetails | undefined>(undefined)

  useEffect(() => {
    window.servers
      .getServers()
      .then((servers: any) => {
        console.log('912385', servers[props.serverId])
        setServer(servers[props.serverId])
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
      <p>{server.host}</p>
    </div>
  )
}

export default ServerPage
