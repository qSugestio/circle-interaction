import styles from './Info.module.css'

import React from 'react'
import { useCirclesContext } from '../../../AppProvider'

const Info = () => {
  const { circles } = useCirclesContext()

  return circles.length ? (
    circles.map((circle, index) => (
      <ul className={styles.circleInfo} key={index}>
        <li>ID: {++index}</li>
        <li>X Position: {circle.x.toFixed(2)}</li>
        <li>Y Position: {circle.y.toFixed(2)}</li>
        <li>Radius: {circle.radius}</li>
        <li>Mass: {circle.mass}</li>
        <li>velocityX: {circle.velocity.x.toFixed(2)}</li>
        <li>velocityY: {circle.velocity.y.toFixed(2)}</li>
      </ul>
    ))
  ) : (
    <div>Шары отсутсвуют</div>
  )
}

export default Info
