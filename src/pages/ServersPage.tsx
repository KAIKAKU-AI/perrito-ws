import Header from '@components/Header'
import { Link } from 'react-router-dom'

interface ServersPageProps {}

const ServersPage = (props: ServersPageProps) => {
  return (
    <div>
      <Header activePage="servers" />
      <h1>💖 Servers page!</h1>
      <p>Welcome to Perrito</p>
      <Link to={'/'}>Dashboard</Link>
    </div>
  )
}

export default ServersPage
