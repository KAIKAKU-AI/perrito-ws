import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/inputs/SideBarButton'
import SideBarDropdown from '@components/SideBar/inputs/SideBarDropdown'
import { ServerClientDetails, Servers } from '@pages/ServersPage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles.scss'

const index = () => {
  const params = useParams()
  const selectedServer = params.serverId
  const selectedConnection = params.connectionId

  console.log('459075', selectedServer, selectedConnection)

  const [servers, setServers] = useState<Servers>({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [clients, setClients] = useState<ServerClientDetails[]>([])

  useEffect(() => {
    window.servers
      .getServers()
      .then((servers: any) => {
        setServers(servers)
        setClients(servers[selectedServer].clients)
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
      })
  }, [])

  return (
    <>
      <Header activePage="dashboard" />
      <div id="page-content">
        <SideBar title="Clients" isOpen={sidebarOpen}>
          <SideBarDropdown
            title="Select server"
            defaultOption={{ value: '', label: 'Select server' }}
            dropdownOptions={Object.keys(servers).map(serverId => ({
              value: serverId,
              label: servers[serverId].name,
            }))}
            activeDropdownValue={selectedServer ? selectedServer : ''}
            onChange={e => {
              window.location.href = `/dashboard/${e.target.value}`
            }}
          />
          {clients.map((connection, index) => (
            <SideBarButton
              key={index}
              title={connection.id}
              id={connection.id}
              active={selectedConnection === connection.id}
              redirect={`/dashboard/${selectedServer}/${connection.id}`}
            />
          ))}
        </SideBar>
        <div className="page-content__container">
          <div className="page__main">
            <SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default index
