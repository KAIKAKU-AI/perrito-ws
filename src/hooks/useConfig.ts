import { useEffect, useState } from 'react'

export const useConfig = () => {
  const [loadedConfig, setLoadedConfig] = useState<any>(undefined)

  useEffect(() => {
    const loadConfig = async () => {
      // Assuming window.config.getConfig() fetches all the configuration settings
      const config = await window.config.getConfig()
      setLoadedConfig(config)
    }

    loadConfig()
  }, [])

  // Method to update individual config settings
  const updateConfig = async (key: string, value: any) => {
    await window.config.updateConfig(key, value)

    const newConfig = await window.config.getConfig()
    console.log('482979', newConfig)
    setLoadedConfig(newConfig)
  }

  const setConfig = async (newConfig: any) => {
    await window.config.setConfig(newConfig)
    setLoadedConfig(newConfig)
  }

  return { config: loadedConfig, updateConfig, setConfig }
}
