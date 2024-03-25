import React, { useEffect, useRef, useState } from 'react'
import { useAppContext, useCirclesContext } from '../AppProvider'

class Circle {
  x: number
  y: number
  radius: number
  mass: number
  color: string
  velocity: { x: number; y: number }

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocityX: number,
    velocityY: number
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.mass = radius * 0.05
    this.color = color
    this.velocity = { x: velocityX, y: velocityY }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update(
    canvas: HTMLCanvasElement,
    circles: Circle[],
    ctx: CanvasRenderingContext2D,
    isDrawConnectingLines: boolean,
    isCollision: boolean,
    gravity: number
  ) {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.y = canvas.height - this.radius
      this.velocity.y = -this.velocity.y * 0.8
      this.velocity.x *= 0.99

      if (Math.abs(this.velocity.y) < 1.705) this.velocity.y = 0
      if (Math.abs(this.velocity.x) < 0.3) this.velocity.x = 0
    } else {
      this.velocity.y += gravity
    }

    this.x += this.velocity.x
    this.y += this.velocity.y

    if (isDrawConnectingLines || isCollision) {
      for (let circle of circles) {
        if (circle !== this) {
          const distance = getDistance(this.x, this.y, circle.x, circle.y)
          // притяжение тел
          // let force = ((distance - this.radius) / distance) * 1
          // if (true) {
          //   distance < this.radius
          //     ? (force = (distance - this.radius) * 1)
          //     : (force = 2)
          // }

          if (isDrawConnectingLines)
            this.isDrawConnectingLines(distance, ctx, circle)

          if (isCollision) {
            if (distance < this.radius + circle.radius) {
              const angle = Math.atan2(circle.y - this.y, circle.x - this.x)
              const targetX = this.x - Math.cos(angle)
              const targetY = this.y - Math.sin(angle)
              const velocityX = targetX - circle.x
              const velocityY = targetY - circle.y

              this.velocity.x += velocityX * 0.05 //* force
              this.velocity.y += velocityY * 0.05 //* force
            }
          }
        }
      }
    }
  }

  showInfo() {
    return `x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(
      2
    )}, velocityX: ${this.velocity.x.toFixed(
      2
    )}, velocityY: ${this.velocity.y.toFixed(
      2
    )}, gravity:$ {gravity.toFixed(2)}`
  }

  isDrawConnectingLines(
    distance: number,
    ctx: CanvasRenderingContext2D,
    circle: Circle
  ) {
    if (distance < 500) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(circle.x, circle.y)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'white'
      ctx.stroke()
    }
  }
}

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const xDistance = x2 - x1
  const yDistance = y2 - y1
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
}

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { circles, setCircles } = useCirclesContext()
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()

  const { settings } = useAppContext()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      circles.forEach(circle => circle.draw(ctx))
    }
    render()

    let animationFrameId: number
    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      circles.forEach(circle => {
        circle.update(
          canvas,
          circles,
          ctx,
          settings.isDrawConnectingLines,
          settings.isCollision,
          settings.gravity
        )
        circle.draw(ctx)
      })
    }
    animate()
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [circles, settings])

  function createCircle(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!settings.isSpawn) return

    const x = +event.clientX
    const y = +event.clientY
    const radius = +settings.radius
    const velocityX = +settings.velocityX
    const velocityY = +settings.velocityY
    // const radius = Math.floor(Math.random() * 16) + 15
    // const x = event.clientX
    // const y = event.clientY
    // const velocityX = Math.random() * 2 + 1
    // const velocityY = Math.random() * 2 + 1

    setCircles([
      ...circles,
      new Circle(x, y, radius, 'rgba(250, 10, 30, 0.9)', velocityX, velocityY),
    ])
  }

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={event => createCircle(event)}
    />
  )
}

export default Canvas
