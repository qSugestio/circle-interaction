import React from 'react'
import { initialState, useAppContext } from '../../../SettingsProvider'
import Circle from '../../../utils/Circle'
import Button from '../Settings/Button/Button'

const Templates = () => {
  const { settings, setSettings } = useAppContext()
  return (
    <div>
      <Button
        text='Небо'
        initialState={false}
        onClick={() => {
          setSettings({
            ...initialState,
            isTail: true,
            isAttraction: -1,
            gravity: 0,
            massFactor: 0.2,
          })
          for (let i = 0; i < 10; i++) {
            const randomX = Math.random() * window.innerWidth
            const randomY = Math.random() * window.innerHeight
            new Circle(randomX, randomY, 10, 'rgba(250, 10, 30, 0.9)', 0, 0)
          }
        }}
      />
      <Button
        text='Атом'
        initialState={false}
        onClick={() => {
          setSettings({
            ...initialState,
            isTail: true,
            isAttraction: 1,
            gravity: 0,
            massFactor: 0.05,
            isAttractionToCursor: true,
          })
          for (let i = 0; i < 15; i++) {
            const randomX = Math.random() * window.innerWidth
            const randomY = Math.random() * window.innerHeight
            new Circle(randomX, randomY, 10, 'rgba(250, 10, 30, 0.9)', 0, 0)
          }
        }}
      />
    </div>
  )
}

export default Templates
