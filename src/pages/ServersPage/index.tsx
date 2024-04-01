import PlusIcon from '@assets/images/icons/plus.svg?react'
import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/inputs/SideBarButton'
import { IncomingMessage } from 'http'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'
import { WebSocket, WebSocketServer } from 'ws'
import '../styles.scss'
import CreateServerPage from './CreateServerPage'
import ServerPage from './ServerPage'
import './styles.scss'

declare global {
  interface Window {
    servers: any
  }
}

export interface ServerClientDetails {
  id: string
  socket: WebSocket
  request: IncomingMessage
}

export interface ServerDetails {
  name: string
  host: string
  port: number
  server: WebSocketServer
  clients: ServerClientDetails[]
}

export interface Servers {
  [id: string]: ServerDetails
}

const index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [servers, setServers] = useState<PerritoServerType[]>([])

  const params = useParams()
  const selectedServerId = params.serverId

  useEffect(() => {
    window.servers
      .getServers()
      .then((servers: PerritoServerType[]) => {
        setServers(servers)
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
      })
  }, [])

  return (
    <>
      <Header activePage="servers" />
      <div id="page-content">
        <SideBar title="Servers" isOpen={sidebarOpen}>
          <SideBarButton
            id="create"
            title="Create"
            redirect="/servers/create"
            active={window.location.pathname === '/servers/create'}
            icon={<PlusIcon />}
          />
          {/* {Object.keys(servers).map((serverId: string) => {
            const server = (servers as any)[serverId] // Specify the type of the index expression as 'string'

            return (
              <SideBarButton
                key={serverId}
                title={server.name}
                id={server.id}
                active={selectedServerId === serverId}
                redirect={`/servers/${serverId}`}
              />
            )
          })} */}

          {servers?.map((server: PerritoServerType) => {
            return (
              <SideBarButton
                key={server.id}
                title={server.name}
                id={server.id}
                active={selectedServerId === server.id}
                redirect={`/servers/${server.id}`}
              />
            )
          })}
        </SideBar>

        <div className="page-content__container">
          <div className="page__main">
            <SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />

            {window.location.pathname === '/servers/create' && <CreateServerPage setServers={setServers} />}

            {selectedServerId && window.location.pathname !== '/servers/create' && (
              <ServerPage serverId={selectedServerId} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default index
