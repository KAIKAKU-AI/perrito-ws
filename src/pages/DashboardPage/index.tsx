import Header from '@components/Header'
import SideBar from '@components/SideBar'
import SideBarController from '@components/SideBar/SideBarController'
import SideBarButton from '@components/SideBar/inputs/SideBarButton'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles.scss'

const index = () => {
  const params = useParams()
  const selectedConnection = params.connectionId
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
        <SideBar title="Connections" isOpen={sidebarOpen}>
          <SideBarDropdown />
          {connections.map((connection, index) => (
            <SideBarButton
              key={index}
              title={connection.title}
              id={connection.id}
              active={selectedConnection === connection.id}
              redirect={`/dashboard/${connection.id}`}
            />
          ))}
        </SideBar>
        <div className="page-content__container">
          <div className="page__main">
            <SideBarController isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default index
