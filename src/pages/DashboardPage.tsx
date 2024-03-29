import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarConnectionButton from '@components/SideBar/buttons/SideBarConnectionButton'
import { useParams } from 'react-router-dom'
import './styles.scss'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  const params = useParams()
  const selectedConnection = params.connectionId

  const connections = [
    {
      id: 'abc',
      title: 'abc123',
    },
    {
      id: 'def',
      title: 'def234',
    },
  ]

  return (
    <>
      <Header activePage="dashboard" />
      <div id="page-content">
        <div className="sidebar-container">
          <SideBar title="Connections">
            {connections.map((connection, index) => (
              <SideBarConnectionButton
                key={index}
                title={connection.title}
                id={connection.id}
                active={selectedConnection === connection.id}
                redirect={`/dashboard/${connection.id}`}
              />
            ))}
          </SideBar>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
