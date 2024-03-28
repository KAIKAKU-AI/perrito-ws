import { Link } from 'react-router-dom'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <div>
      <h1>💖 Hello World!</h1>
      <p>Welcome to Perrito</p>
      <Link to={'/servers'}>Servers</Link>
    </div>
  )
}

export default DashboardPage
