import fs from 'fs'
import { appConfigPath } from '../main'

const readConfig = (): Record<string, any> => {
  const data = fs.readFileSync(appConfigPath, 'utf8')
  return JSON.parse(data)
}

const writeConfig = (config: Record<string, any>) => {
  fs.writeFileSync(appConfigPath, JSON.stringify(config, null, 2))
}

export const updateConfig = (newConfig: any) => {
  writeConfig(newConfig)
}

export const getConfigKey = (key: string): any => {
  const config = readConfig()
  return config[key]
}

export const getConfig = (): any => {
  return readConfig()
}
