import PerritoSad from '@assets/images/perrito/perrito-sad.svg?react'
import Header from '@components/Header'
import { useLocation, useRouteError } from 'react-router-dom'
import '../styles.scss'
import './error-page.scss'

const index = () => {
  const error = useRouteError() as any
  const location = useLocation()

  console.error(error)
  return (
    <>
      <Header />
      <div id="page-content">
        <div className="error-container">
          <PerritoSad />
          <h1>
            {error.status}
            {error.status && <>&nbsp;&nbsp;</>}
            {error.statusText ?? 'An error occurred!'}
          </h1>
          <p>{error.message}</p>
          <code>Location: {location.pathname}</code>
          {error.data && <code>{error.data}</code>}

          {/* TODO: Implement settings to show stack on error (should be off by default) */}
          {/* {error.error.stack && <code>{error.error.stack}</code>} */}
        </div>
      </div>
    </>
  )
}

export default index