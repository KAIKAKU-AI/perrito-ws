import Header from '@components/Header'
import SideBar from '@components/SideBar'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles.scss'

declare global {
  interface Window {
    servers: any
  }
}

const index = () => {
  const [servers, setServers] = useState([])
  const [serverName, setServerName] = useState('my server')
  const [serverHost, setServerHost] = useState('127.0.0.1')
  const [serverPort, setServerPort] = useState('6969')
  const params = useParams()

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
        console.log('Server started:', response)
        window.servers
          .getServers()
          .then((servers: any) => {
            setServers(servers)
          })
          .catch((error: any) => {
            console.error('Error getting servers:', error)
          })
      })
      .catch((error: any) => {
        console.error('Error starting server:', error)
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

  return (
    <>
      <Header activePage="servers" />
      <div id="page-content">
        <div className="sidebar-container">
          <SideBar title="Servers" showController></SideBar>
        </div>

        <div className="page-content__container">
          <div className="page__main">
            <h1>Servers</h1>
            <form
              className="server__form"
              onSubmit={e => {
                e.preventDefault()
                handleAddServer()
              }}>
              <input
                type="text"
                placeholder="Server Name"
                value={serverName}
                onChange={e => setServerName(formatName(e.target.value))}
              />
              <input
                type="text"
                placeholder="Server ID"
                value={formatId(serverName)}
                contentEditable={false}
                readOnly
              />
              <input
                type="text"
                placeholder="Server Host"
                value={serverHost}
                onChange={e => setServerHost(formatHost(e.target.value))}
              />
              <input
                type="text"
                placeholder="Server Port"
                value={serverPort}
                onChange={e => setServerPort(formatPort(e.target.value))}
              />

              <button type="submit">Add Server</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
