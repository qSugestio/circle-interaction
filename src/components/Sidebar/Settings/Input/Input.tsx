import React, { useState } from 'react'
import styles from './Input.module.css'

const Input: React.FC<{
  onChange: (value: number) => void
  text: string
  initialState: number
  min: number
  max: number
  step?: number
}> = ({ onChange, text, initialState, min, max, step }) => {
  const [value, setValue] = useState(initialState)

  return (
    <div>
      <div>
        <span className={styles.title}>{text} - </span>
        <span className={styles.title}>{value}</span>
      </div>
      <input
        type='range'
        className={styles.input}
        min={min}
        max={max}
        value={value}
        step={step || 0.5}
        onChange={event => {
          setValue(+event.target.value)
          onChange(+event.target.value)
        }}
      />
    </div>
  )
}

export default Input
