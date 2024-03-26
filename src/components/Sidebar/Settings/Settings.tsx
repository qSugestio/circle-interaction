import React from 'react'
import { useAppContext } from '../../../SettingsProvider'
import Circle from '../../../utils/Circle'
import Button from './Button/Button'
import Input from './Input/Input'

const Settings: React.FC = () => {
  const { settings, setSettings } = useAppContext()

  return (
    <div>
      <Input
        text='Радиус'
        initialState={settings.radius}
        min={10}
        max={100}
        onChange={(value: number) =>
          setSettings({ ...settings, radius: value })
        }
      />
      <Input
        text='Гравитация'
        initialState={settings.gravity}
        min={-5}
        max={5}
        onChange={(value: number) =>
          setSettings({ ...settings, gravity: value })
        }
      />
      <Input
        text='Притяжение'
        initialState={settings.isAttraction}
        min={-1}
        max={1}
        step={0.05}
        onChange={(value: number) =>
          setSettings({ ...settings, isAttraction: value })
        }
      />
      <Input
        text='X Скорость'
        initialState={settings.velocityX}
        min={-20}
        max={20}
        onChange={(value: number) =>
          setSettings({ ...settings, velocityX: value })
        }
      />
      <Input
        text='Y Скорость'
        initialState={settings.velocityY}
        min={-20}
        max={20}
        onChange={(value: number) =>
          setSettings({ ...settings, velocityY: value })
        }
      />
      <Input
        text='Коэффициент массы'
        initialState={settings.massFactor}
        min={0.05}
        max={1}
        step={0.05}
        onChange={(value: number) =>
          setSettings({ ...settings, massFactor: value })
        }
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
        onClick={() => Circle.removeAllCircles()}
        text='Очистить холст шаров'
        initialState={false}
      />
      <Button
        onClick={() =>
          setSettings({
            ...settings,
            isAttractionToCursor: !settings.isAttractionToCursor,
          })
        }
        text='Притяжение к курсору'
        initialState={settings.isAttractionToCursor}
      />
      <Button
        onClick={() =>
          setSettings({
            ...settings,
            isTail: !settings.isTail,
          })
        }
        text='хвост'
        initialState={settings.isTail}
      />
    </div>
  )
}

export default Settings
