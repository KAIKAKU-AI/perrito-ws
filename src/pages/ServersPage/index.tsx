import Header from '@components/Header'
import Setting, { SettingType } from '@components/Setting'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/buttons/SideBarConnectionButton'
import { randomWords } from '@utils/random-words'
import { capitalize } from '@utils/string-formatting'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import '../styles.scss'
import './styles.scss'

declare global {
  interface Window {
    servers: any
  }
}

interface CreateServerResponse {
  message?: string
  level: 'success' | 'error' | 'warning'
}

const index = () => {
  const generateRandomName = () => {
    // Choose 3 random words at random and stick them  together with a space
    let name = ''
    for (let i = 0; i < 3; i++) {
      name += capitalize(randomWords[Math.floor(Math.random() * randomWords.length)] + ' ')
    }

    return name.trim()
  }

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [servers, setServers] = useState([])
  const [serverName, setServerName] = useState('My Server')
  const [serverHost, setServerHost] = useState('127.0.0.1')
  const [serverPort, setServerPort] = useState('6969')
  const [loading, setLoading] = useState(false)
  const [createServerResponse, setCreateServerResponse] = useState<CreateServerResponse>({
    message: undefined,
    level: 'success',
  })
  const params = useParams()
  const selectedServer = params.serverId

  useEffect(() => {
    setServerName(generateRandomName())

    window.servers
      .getServers()
      .then((servers: any) => {
        setServers(servers)
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
        setLoading(false)
      })
  }, [])

  const handleAddServer = async () => {
    // Re-validate the server name, host, and port just in case
    if (!serverName || !serverHost || !serverPort) return

    const name = formatName(serverName)
    const id = formatId(name)
    const host = formatHost(serverHost)
    const port = parseInt(formatPort(serverPort))

    window.servers
      .startServer(id, name, host, port)
      .then((response: any) => {
        console.log('208007', response)
        setCreateServerResponse({
          message: response.message,
          level: 'success',
        })
        window.servers
          .getServers()
          .then((servers: any) => {
            setServers(servers)
            setLoading(false)
          })
          .catch((error: any) => {
            console.error('Error getting servers:', error)
            setLoading(false)
          })
      })
      .catch((error: any) => {
        setLoading(false)
        console.error('Error starting server:', error)
        setCreateServerResponse({
          message: error.message,
          level: 'error',
        })
      })
  }

  const formatId = (name: string) => {
    // Convert the name to lowercase and replace spaces with hyphens
    return name.toLowerCase().replace(/\s/g, '-')
  }

  const formatName = (name: string) => {
    // Do not allow characters other than letters, numbers, and spaces
    return name.replace(/[^a-zA-Z0-9\s]/g, '')
  }

  const formatHost = (host: string) => {
    return host.replace(/[^a-zA-Z0-9\.\-]/g, '')
  }

  const formatPort = (port: string) => {
    const cleanedPort = port.replace(/\D/g, '')

    if (parseInt(cleanedPort) < 0) return '0'
    if (parseInt(cleanedPort) > 65535) return '65535'

    return cleanedPort.substring(0, 5)
  }

  const handleCreateServer = () => {
    setLoading(true)
    handleAddServer()
  }

  return (
    <>
      <Header activePage="servers" />
      <div id="page-content">
        <SideBar title="Servers" isOpen={sidebarOpen}>
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
            <h1>Create a WebSocket server</h1>
            <Setting
              type={SettingType.TEXT}
              title="Server name"
              description="The name of the server. This will be displayed in the server list."
              onTextChange={e => setServerName(formatName(e.target.value))}
              textValue={serverName}
              extraClasses={['large']}
            />

            <Setting
              type={SettingType.TEXT}
              title="Server ID"
              description="A unique identifier used by Perrito to identify a server."
              textValue={formatId(serverName)}
              textOptions={{
                readOnly: true,
              }}
              extraClasses={['large']}
            />

            <Setting
              type={SettingType.TEXT}
              title="Server host"
              description="The IP address or hostname of the server."
              onTextChange={e => setServerHost(formatHost(e.target.value))}
              textValue={serverHost}
            />

            <Setting
              type={SettingType.TEXT}
              title="Server port"
              description="The port number the server will listen on. (Must be in range 0 - 65535)"
              onTextChange={e => setServerPort(formatPort(e.target.value))}
              textValue={serverPort}
              extraClasses={['small']}
            />

            <Setting
              type={SettingType.INFO}
              title="Server url preview: "
              infoValue={`ws://${serverHost}:${serverPort}`}
            />

            <div className="create-server__footer">
              <div className={`create-server__response create-server__response--${createServerResponse.level}`}>
                {createServerResponse.message}
              </div>

              <button className="create-server__button" onClick={handleCreateServer}>
                <span>
                  {loading ? (
                    <>
                      <BarLoader color="#fff" loading={loading} height={6} width={75} />
                    </>
                  ) : (
                    'Create server'
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
