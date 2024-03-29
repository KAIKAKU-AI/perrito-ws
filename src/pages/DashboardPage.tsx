import Header from '@components/Header'
import SideBar from '@components/SideBar'
import './styles.scss'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <>
      <Header activePage="dashboard" />
      <div id="page-content">
        <div className="sidebar-container">
          <SideBar title="Connections" />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
