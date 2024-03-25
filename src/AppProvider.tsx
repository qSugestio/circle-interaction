import React, { createContext, useContext, useState } from 'react'

interface SettingsContextType {
  velocityX: number
  velocityY: number
  radius: number
  massFactor: number
  gravity: number
  isDrawConnectingLines: boolean
  isCollision: boolean
  isSpawn: boolean
  color: string
}

const initialState: SettingsContextType = {
  velocityX: 15,
  velocityY: 15,
  radius: 15,
  massFactor: 0.05,
  gravity: 0.5,
  isDrawConnectingLines: false,
  isCollision: true,
  isSpawn: true,
  color: 'rgba(250, 10, 30, 0.9)',
}

const SettingsContext = createContext<{
  settings: SettingsContextType
  setSettings: React.Dispatch<any>
}>({
  settings: initialState,
  setSettings: () => null,
})

interface CirlcesContextType extends SettingsContextType {
  velocity: { x: number; y: number }
  y: number
  x: number
  mass: number
  update(
    canvas: HTMLCanvasElement,
    circles: SettingsContextType[],
    ctx: CanvasRenderingContext2D,
    isDrawConnectingLines: boolean,
    isCollision: boolean,
    gravity: number
  ): unknown
  draw(ctx: CanvasRenderingContext2D): void
}

const CirclesContext = createContext<{
  circles: CirlcesContextType[]
  setCircles: React.Dispatch<any>
}>({
  circles: [],
  setCircles: () => null,
})

export const OptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SettingsContextType>(initialState)
  const [circles, setCircles] = useState<CirlcesContextType[]>([])

  return (
    <CirclesContext.Provider value={{ circles, setCircles }}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
    </CirclesContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(SettingsContext)
}
export const useCirclesContext = () => {
  return useContext(CirclesContext)
}
