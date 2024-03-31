import { PulseLoader } from 'react-spinners'
import { ServerDetails } from '.'

interface ServerPageProps {
  server: ServerDetails
}

const ServerPage = (props: ServerPageProps) => {
  if (!props.server) return <PulseLoader color="#000" />

  return (
    <div>
      <p>{props.server.host}</p>
    </div>
  )
}

export default ServerPage
