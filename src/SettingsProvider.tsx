import React, { createContext, useContext, useState } from 'react'

interface SettingsContextType {
  velocityX: number
  velocityY: number
  radius: number
  massFactor: number
  gravity: number
  isAttraction: number
  isDrawConnectingLines: boolean
  isCollision: boolean
  isSpawn: boolean
  isAttractionToCursor: boolean
  color: string
}

const initialState: SettingsContextType = {
  velocityX: 15,
  velocityY: 15,
  radius: 15,
  massFactor: 0.05,
  gravity: 0.5,
  isAttraction: 0,
  isDrawConnectingLines: false,
  isCollision: true,
  isSpawn: true,
  isAttractionToCursor: false,
  color: 'rgba(250, 10, 30, 0.9)',
}

const SettingsContext = createContext<{
  settings: SettingsContextType
  setSettings: React.Dispatch<SettingsContextType>
}>({
  settings: initialState,
  setSettings: () => null,
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SettingsContextType>(initialState)

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(SettingsContext)
}
