import EditIcon from '@assets/images/icons/edit.svg'
import LinkIcon from '@assets/images/icons/link.svg'
import RefreshIcon from '@assets/images/icons/refresh.svg'
import Setting, { SettingType } from '@components/Setting'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'
import './server-page.scss'

interface ServerPageProps {
  serverId: string
  servers: PerritoServerType[]
}

const ServerPage = (props: ServerPageProps) => {
  const [server, setServer] = useState<PerritoServerType | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('741099')
    setServer(props.servers.find((server: PerritoServerType) => server.id === props.serverId))
    console.log('220272')
  }, [props.servers])

  if (!server) {
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
          <h1 className="server-page__header-title">{server.name}</h1>
          <h2 className="server-page__header-subtitle">
            {server.host}:{server.port}
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
      <Setting type={SettingType.INFO} title="Server url preview" infoValue={`ws://${server.host}:${server.port}`} />
      <Setting type={SettingType.INFO} title="Server host" infoValue={server.host} />
      <Setting type={SettingType.INFO} title="Server port" infoValue={server.port.toString()} />
      <Setting type={SettingType.INFO} title="Number of clients" infoValue={server.clients.length.toString()} />

      <div className="server-page__button-container">
        <button className="server-page__button" onClick={() => {}}>
          <span>Jump to clients</span>
        </button>
        <button
          className="server-page__button server-page__button--danger"
          onClick={() => {
            window.servers.stopServer(server.id)

            navigate('/servers')
          }}>
          <span>Delete</span>
        </button>
      </div>
    </>
  )
}

export default ServerPage
