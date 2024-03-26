import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../AppProvider'
import Circle from '../utils/Circle'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  const { settings } = useAppContext()

  let animationFrameId: number
  const animate = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    animationFrameId = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Circle.allCircles.forEach(circle => {
      circle.update(
        canvas,
        ctx,
        settings.isDrawConnectingLines,
        settings.isCollision,
        settings.gravity
      )
      circle.draw(ctx)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      Circle.allCircles.forEach(circle => circle.draw(ctx))
    }
    render()

    animate()
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [settings])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function createCircle(event: React.MouseEvent<HTMLCanvasElement>) {
    if (settings.isSpawn) {
      new Circle(
        +event.clientX,
        +event.clientY,
        +settings.radius,
        'rgba(250, 10, 30, 0.9)',
        +settings.velocityX,
        +settings.velocityY
      )
    }
  }

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
