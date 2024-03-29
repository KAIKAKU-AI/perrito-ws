import Header from '@components/Header'
import './styles.scss'

interface DashboardPageProps {}

const DashboardPage = (props: DashboardPageProps) => {
  return (
    <>
      <Header activePage="dashboard" />
      <div id="page-content"></div>
    </>
  )
}

export default DashboardPage
