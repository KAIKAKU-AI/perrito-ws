// ServerContext.js
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { PerritoServerType } from 'src/backend/daemons/PerritoTypes'

export const ServerContext = createContext({
  servers: [] as PerritoServerType[],
  fetchServers: () => {},
})

export const ServerProvider = ({ children }: any) => {
  const [servers, setServers] = useState<PerritoServerType[]>([])

  const fetchServers = useCallback(() => {
    window.servers
      .getServers()
      .then((serversData: any) => {
        setServers(serversData)
      })
      .catch((error: any) => {
        console.error('Error getting servers:', error)
      })
  }, [])

  useEffect(() => {
    fetchServers() // Call on initial mount

    const updateListener = (_event: any, data: { data: any }) => {
      const serversData = data?.data
      if (serversData) {
        setServers(serversData)
      } else {
        setServers([])
      }
    }

    // Add listener
    window.daemon.onUpdate(updateListener)

    // Remove listener on cleanup
    return () => {
      window.daemon.removeUpdateListener(updateListener)
    }
  }, [fetchServers])

  const value = {
    servers,
    fetchServers, // Make the manual fetch function available in context
  }

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

// Custom hook to use the servers and the fetch function
export const useServers = () => {
  const context = useContext(ServerContext)
  if (context === undefined) {
    throw new Error('useServers must be used within a ServerProvider')
  }
  return context
}
