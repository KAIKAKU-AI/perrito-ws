import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarConnectionButton from '@components/SideBar/buttons/SideBarConnectionButton'
import { useState } from 'react'
import './styles.scss'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  const [activeConnection, setActiveConnection] = useState<string | undefined>()

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
                active={activeConnection === connection.id}
                onClick={() => setActiveConnection(connection.id)}
              />
            ))}
          </SideBar>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
