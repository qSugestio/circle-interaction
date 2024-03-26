import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../SettingsProvider'
import Circle from '../utils/Circle'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { settings } = useAppContext()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    let animationFrameId: number

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        Circle.allCircles.forEach(circle => {
          circle.update(
            canvas,
            ctx,
            mousePos,
            settings.massFactor,
            settings.isAttraction,
            settings.isAttractionToCursor,
            settings.isDrawConnectingLines,
            settings.isCollision,
            settings.isTail,
            settings.gravity
          )
          circle.draw(ctx, settings.isTail)
        })

        animate()
      })
    }

    animate()

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [settings, mousePos])

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

  useEffect(() => {
    window.addEventListener('mousemove', event =>
      setMousePos({ x: event.clientX, y: event.clientY })
    )
  }, [])

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
