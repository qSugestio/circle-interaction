import React, { useEffect } from 'react'

interface Circle {
  x: number
  y: number
  radius: number
  // Другие свойства круга
}

interface CollisionDetectionProps {
  circles: Circle[]
  handleCollision: (circle1: Circle, circle2: Circle) => void
}

const CollisionDetection: React.FC<CollisionDetectionProps> = ({
  circles,
  handleCollision,
}) => {
  // Функция для обнаружения столкновений и обработки их
  const detectCollisions = () => {
    circles.forEach((circle1, index1) => {
      circles.forEach((circle2, index2) => {
        if (index1 !== index2) {
          const distance = Math.sqrt(
            Math.pow(circle1.x - circle2.x, 2) +
              Math.pow(circle1.y - circle2.y, 2)
          )
          if (distance < circle1.radius + circle2.radius) {
            // Обработка столкновения между кругами circle1 и circle2
            handleCollision(circle1, circle2)
          }
        }
      })
    })
  }

  // Вызов функции для обнаружения столкновений при загрузке компонента
  useEffect(() => {
    detectCollisions()
  }, [circles]) // Зависимость от circles для обновления при изменениях в кругах

  return null // Компонент CollisionDetection не отображает ничего визуально
}

export default CollisionDetection
