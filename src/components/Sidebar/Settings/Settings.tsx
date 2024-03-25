import React from 'react'
import { useAppContext, useCirclesContext } from '../../../AppProvider'
import Button from './Button/Button'
import Input from './Input/Input'

const Settings: React.FC = () => {
  const { settings, setSettings } = useAppContext()
  const { setCircles } = useCirclesContext()

  return (
    <div>
      <Input
        text='Радиус'
        initialState={settings.radius}
        min={10}
        max={100}
        onChange={(value: number) => {
          setSettings({ ...settings, radius: value })
        }}
      />
      <Input
        text='Гравитация'
        initialState={settings.gravity}
        min={-5}
        max={5}
        onChange={(value: number) => {
          setSettings({ ...settings, gravity: value })
        }}
      />
      <Input
        text='Притяжение'
        initialState={0}
        min={-5}
        max={5}
        onChange={(value: number) => {
          console.log('упс, пока не работает')
        }}
      />

      <Button
        onClick={() =>
          setSettings({
            ...settings,
            isDrawConnectingLines: !settings.isDrawConnectingLines,
          })
        }
        text='Соединения меж шаров'
        initialState={settings.isDrawConnectingLines}
      />

      <Button
        onClick={() =>
          setSettings({ ...settings, isCollision: !settings.isCollision })
        }
        text='Коллизия'
        initialState={settings.isCollision}
      />
      <Button
        onClick={() => setSettings({ ...settings, isSpawn: !settings.isSpawn })}
        text='Спавн шаров'
        initialState={settings.isSpawn}
      />
      <Button
        onClick={() => setCircles([])}
        text='Очистить холст шаров'
        initialState={false}
      />
    </div>
  )
}

export default Settings
