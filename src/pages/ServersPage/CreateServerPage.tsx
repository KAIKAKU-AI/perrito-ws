import Setting, { SettingType } from '@components/Setting'
import { useConfig } from '@hooks/useConfig'
import { randomWords } from '@utils/random-words'
import {
  capitalize,
  formatServerHost,
  formatServerId,
  formatServerName,
  formatServerPort,
} from '@utils/string-formatting'
import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'

interface CreateServerResponse {
  message?: string
  level: 'success' | 'error' | 'warning'
}

interface CreateServerPageProps {
  setServers: (servers: PerritoServerType[]) => void
}

const CreateServerPage = (props: CreateServerPageProps) => {
  const generateRandomName = () => {
    // Choose 3 random words at random and stick them  together with a space
    let name = ''
    for (let i = 0; i < 3; i++) {
      name += capitalize(randomWords[Math.floor(Math.random() * randomWords.length)] + ' ')
    }

    return name.trim()
  }

  const { config } = useConfig()
  const [serverName, setServerName] = useState('My Server')
  const [serverHost, setServerHost] = useState('127.0.0.1')
  const [serverPort, setServerPort] = useState('6969')
  const [loading, setLoading] = useState(false)
  const [createServerResponse, setCreateServerResponse] = useState<CreateServerResponse>({
    message: undefined,
    level: 'success',
  })

  useEffect(() => {
    const updateListener = (_: any, data: any) => {
      const serversData = data?.data
      if (serversData) {
        props.setServers(serversData)
      } else {
        props.setServers([])
      }
      setLoading(false)
    }

    window.daemon.onUpdate(updateListener)

    // Cleanup
    return () => {
      window.daemon.removeUpdateListener(updateListener)
    }
  }, [])

  useEffect(() => {
    if (config === undefined) return

    if (config?.RANDOMIZE_SERVER_NAME === true) {
      setServerName(generateRandomName())
    } else {
      setServerName(config?.DEFAULT_SERVER_NAME ?? 'My Server')
    }
    setServerHost(config?.DEFAULT_SERVER_HOST ?? '127.0.0.1')
    setServerPort(config?.DEFAULT_SERVER_PORT ?? '80')
  }, [config])

  const handleCreateServer = async () => {
    // Re-validate the server name, host, and port just in case
    if (!serverName || !serverHost || !serverPort) return
    setLoading(true)

    const name = formatServerName(serverName)
    const id = formatServerId(name)
    const host = formatServerHost(serverHost)
    const port = parseInt(formatServerPort(serverPort))

    window.servers
      .startServer(id, name, host, port)
      .then((response: any) => {
        setCreateServerResponse({
          message: response.message,
          level: 'success',
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

  return (
    <>
      <h1>Create a WebSocket server</h1>
      <Setting
        type={SettingType.TEXT}
        title="Server name"
        description="The name of the server. This will be displayed in the server list."
        onTextChange={e => setServerName(formatServerName(e.target.value))}
        textValue={serverName}
        extraClasses={['large']}
      />

      <Setting
        type={SettingType.TEXT}
        title="Server ID"
        description="A unique identifier used by Perrito to identify a server."
        textValue={formatServerId(serverName)}
        textOptions={{
          readOnly: true,
        }}
        extraClasses={['large']}
      />

      <Setting
        type={SettingType.TEXT}
        title="Server host"
        description="The IP address or hostname of the server."
        onTextChange={e => setServerHost(formatServerHost(e.target.value))}
        textValue={serverHost}
      />

      <Setting
        type={SettingType.TEXT}
        title="Server port"
        description="The port number the server will listen on. (Must be in range 0 - 65535)"
        onTextChange={e => setServerPort(formatServerPort(e.target.value))}
        textValue={serverPort}
        extraClasses={['small']}
      />

      <Setting type={SettingType.INFO} title="Server url preview: " infoValue={`ws://${serverHost}:${serverPort}`} />

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
    </>
  )
}

export default CreateServerPage
