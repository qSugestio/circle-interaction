import styles from './Info.module.css'

import React from 'react'
import Circle from '../../../utils/Circle'

const Info = () => {
  return Circle.allCircles.length ? (
    Circle.allCircles.map((circle, index) => {
      const { x, y, mass, radius, velocityX, velocityY } = circle.getInfo()
      return (
        <ul className={styles.circleInfo} key={index}>
          <li>ID: {++index}</li>
          <li>X Position: {x.toFixed(2)}</li>
          <li>Y Position: {y.toFixed(2)}</li>
          <li>Mass: {mass.toFixed(2)}</li>
          <li>Radius: {radius}</li>
          <li>velocityX: {velocityX.toFixed(2)}</li>
          <li>velocityY: {velocityY.toFixed(2)}</li>
        </ul>
      )
    })
  ) : (
    <div>Шары отсутсвуют</div>
  )
}

export default Info
