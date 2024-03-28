import { Link } from 'react-router-dom'
// import Header from '../components/Header'
import Header from '@components/Header'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <div>
      <Header />
      <h1>💖 Dashboard page!</h1>
      <p>Welcome to Perrito</p>
      <Link to={'/servers'}>Servers</Link>
    </div>
  )
}

export default DashboardPage
