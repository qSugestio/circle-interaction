import React, { useState } from 'react'
import Canvas from './components/Canvas'
import Button from './components/Sidebar/Settings/Button/Button'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  const [isMenu, setIsMenu] = useState(false)

  return (
    <>
      <Button
        text='Открыть настройки'
        initialState={false}
        onClick={() => setIsMenu(true)}
        classes='sidebarButton'
      />

      <Sidebar setIsMenu={setIsMenu} isMenu={isMenu} />
      <Canvas />
    </>
  )
}

export default App
