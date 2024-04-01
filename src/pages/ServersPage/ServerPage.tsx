import EditIcon from '@assets/images/icons/edit.svg'
import LinkIcon from '@assets/images/icons/link.svg'
import RefreshIcon from '@assets/images/icons/refresh.svg'
import { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'
import './server-page.scss'

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
    <>
      <div className="server-page__header">
        <div className="server-page__header-title-container">
          <h1 className="server-page__header-title">{server?.name}</h1>
          {/* <h2 className="server-page__header-subtitle">127.0.0.1:8080</h2> */}
          <h2 className="server-page__header-subtitle">
            {server?.host}:{server?.port}
          </h2>
        </div>
        <div className="server-page__header-icon-button-container">
          <button title="Restart server" className="server-page__header-icon-button" onClick={() => {}}>
            <img src={RefreshIcon} />
          </button>
          <button title="Copy server link" className="server-page__header-icon-button" onClick={() => {}}>
            <img src={LinkIcon} />
          </button>
          <button title="Edit server" className="server-page__header-icon-button" onClick={() => {}}>
            <img src={EditIcon} />
          </button>
        </div>
      </div>
    </>
  )
}

export default ServerPage
