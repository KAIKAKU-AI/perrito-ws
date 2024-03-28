import { Link } from 'react-router-dom'

interface ServersPageProps {}

const ServersPage = (props: ServersPageProps) => {
  return (
    <div>
      <h1>💖 Servers page!</h1>
      <p>Welcome to Perrito</p>
      <Link to={'/'}>Dashboard</Link>
    </div>
  )
}

export default ServersPage
