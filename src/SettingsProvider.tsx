import React, { createContext, useContext, useState } from 'react'

interface SettingsContextType {
  velocityX: number
  velocityY: number
  radius: number
  massFactor: number
  gravity: number
  isAttraction: number
  isAttractionToCursor: boolean
  isDrawConnectingLines: boolean
  isCollision: boolean
  isSpawn: boolean
  isTail: boolean
  color: string
}

export const initialState: SettingsContextType = {
  velocityX: 15,
  velocityY: 15,
  radius: 15,
  massFactor: 0.05,
  gravity: 0.5,
  isAttraction: 0,
  isAttractionToCursor: false,
  isDrawConnectingLines: false,
  isCollision: true,
  isSpawn: true,
  isTail: false,
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
