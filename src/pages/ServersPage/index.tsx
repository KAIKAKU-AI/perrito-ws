import PlusIcon from '@assets/images/icons/plus.svg?react'
import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/buttons/SideBarConnectionButton'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WebSocketServer } from 'ws'
import '../styles.scss'
import CreateServerPage from './CreateServerPage'
import ServerPage from './ServerPage'
import './styles.scss'

declare global {
  interface Window {
    servers: any
  }
}

export interface ServerDetails {
  name: string
  host: string
  port: number
  server: WebSocketServer
}

export interface Servers {
  [id: string]: ServerDetails
}

const index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [servers, setServers] = useState<Servers>({})

  const params = useParams()
  const selectedServer = params.serverId

  useEffect(() => {
    window.servers
      .getServers()
      .then((servers: any) => {
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
          {Object.keys(servers).map((serverId: string) => {
            const server = (servers as any)[serverId] // Specify the type of the index expression as 'string'

            return (
              <SideBarButton
                key={serverId}
                title={server.name}
                id={server.id}
                active={selectedServer === serverId}
                redirect={`/servers/${serverId}`}
              />
            )
          })}
        </SideBar>

        <div className="page-content__container">
          <div className="page__main">
            <SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />

            {window.location.pathname === '/servers/create' && <CreateServerPage />}

            {selectedServer && window.location.pathname !== '/servers/create' && (
              <ServerPage server={servers[selectedServer]} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default index
