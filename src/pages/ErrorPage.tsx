import PerritoSad from '@assets/images/perrito/perrito-sad.svg?react'
import Header from '@components/Header'
import { useLocation, useRouteError } from 'react-router-dom'
import './error-page.scss'

export default function ErrorPage() {
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
            {error.status}&nbsp;&nbsp;{error.statusText || error.message}
          </h1>
          <code>Location: {location.pathname}</code>
          {error.data && <code>{error.data}</code>}

          {/* TODO: Implement settings to show stack on error (should be off by default) */}
          {/* {error.error.stack && <code>{error.error.stack}</code>} */}
        </div>
      </div>
    </>
  )
}
