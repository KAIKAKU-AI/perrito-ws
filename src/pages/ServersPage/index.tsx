import PlusIcon from '@assets/images/icons/plus.svg?react'
import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/inputs/SideBarButton'
import { useServers } from '@contexts/ServerContext'
import { IncomingMessage } from 'http'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'
import { WebSocket } from 'ws'
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

const index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { servers, fetchServers } = useServers()

  const params = useParams()
  const selectedServerId = params.serverId

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

            {window.location.pathname === '/servers/create' && <CreateServerPage />}

            {selectedServerId && window.location.pathname !== '/servers/create' && (
              <ServerPage serverId={selectedServerId} servers={servers} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default index
