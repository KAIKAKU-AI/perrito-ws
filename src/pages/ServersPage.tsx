import Header from '@components/Header'

interface ServersPageProps {}

const ServersPage = (props: ServersPageProps) => {
  return (
    <div>
      <Header activePage="servers" />
      <div id="page-content"></div>
    </div>
  )
}

export default ServersPage
