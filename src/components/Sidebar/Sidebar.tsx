import React, { useState } from 'react'
import Info from './Info/Info'
import Settings from './Settings/Settings'
import styles from './Sidebar.module.css'
import Templates from './Template/Templates'

const Sidebar: React.FC<{
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>
  isMenu: boolean
}> = ({ setIsMenu, isMenu }) => {
  const [component, setComponent] = useState(<Settings />)

  return (
    isMenu && (
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <button onClick={() => setComponent(<Settings />)}>Настройки</button>
          <button onClick={() => setComponent(<Info />)}>Инфа</button>
          <button onClick={() => setComponent(<Templates />)}>Шаблоны</button>
          <button onClick={() => setIsMenu(false)}>Закрыть</button>
        </div>
        {component}
      </div>
    )
  )
}

export default Sidebar
