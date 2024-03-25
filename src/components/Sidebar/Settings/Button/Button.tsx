import React, { useState } from 'react'
import styles from './Button.module.css'

const Button: React.FC<{
  onClick: () => void
  text: string
  initialState: boolean
  classes?: string | null
}> = ({ onClick, text, initialState, classes }) => {
  const [isToggle, setIsToggle] = useState(initialState)

  return (
    <button
      onClick={() => {
        setIsToggle(!isToggle)
        return onClick()
      }}
      className={`${styles.button} ${classes && styles[classes]} ${
        isToggle ? styles.active : styles.unactive
      }`}
    >
      {text}
    </button>
  )
}

export default Button
