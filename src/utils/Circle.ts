export default class Circle {
  public static allCircles: Circle[] = []
  private _x: number
  private _y: number
  private _radius: number
  private _mass: number
  private _color: string
  private _velocity: { x: number; y: number }
  private _trails: { x: number; y: number; opacity: number }[] = []

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocityX: number,
    velocityY: number
  ) {
    this._x = x
    this._y = y
    this._radius = radius
    this._mass = radius * 0.005
    this._color = color
    this._velocity = { x: velocityX, y: velocityY }
    Circle.allCircles.push(this)
  }

  public static removeAllCircles() {
    Circle.allCircles = []
  }

  public draw(ctx: CanvasRenderingContext2D, isTail: boolean) {
    ctx.beginPath()
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2)
    ctx.fillStyle = this._color
    ctx.fill()
    ctx.closePath()

    if (isTail) {
      // Отрисовка следа
      for (let i = 0; i < this._trails.length; i++) {
        const trail = this._trails[i]
        ctx.globalAlpha = trail.opacity // Устанавливаем прозрачность
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, this._radius * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = this._color
        ctx.fill()
        ctx.closePath()
      }
      ctx.globalAlpha = 1 // Сбрасываем прозрачность
    }
  }

  public update(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    mousePos: { x: number; y: number },
    massFactor: number,
    isAttraction: number,
    isAttractionToCursor: boolean,
    isDrawConnectingLines: boolean,
    isCollision: boolean,
    isTail: boolean,
    gravity: number
  ) {
    if (isTail) {
      // Обновление и удаление координат следа
      this._trails.push({ x: this._x, y: this._y, opacity: 1.0 }) // Добавляем новую координату с полной прозрачностью
      for (let i = 0; i < this._trails.length; i++) {
        this._trails[i].opacity -= 0.01 // Уменьшаем прозрачность у всех координат следа
      }
      if (this._trails.length > 20) {
        this._trails.shift() // Удаляем старую координату следа
      }
    }

    if (this._x + this._radius > canvas.width) {
      this._x = canvas.width - this._radius // Коррекция положения шара
      this._velocity.x = -this._velocity.x * 0.8 // Уменьшение скорости
    } else if (this._x - this._radius < 0) {
      this._x = this._radius
      this._velocity.x = -this._velocity.x * 0.8
    }

    if (this._y + this._radius > canvas.height) {
      this._y = canvas.height - this._radius // Коррекция положения шара
      this._velocity.y = -this._velocity.y * 0.8 // Уменьшение скорости
    } else if (this._y - this._radius < 0) {
      this._y = this._radius
      this._velocity.y = -this._velocity.y * 0.8
    }

    if (this._y + this._radius < canvas.height || this._y - this._radius > 0) {
      this._velocity.y += gravity
    }

    this._x += this._velocity.x
    this._y += this._velocity.y

    if (
      isDrawConnectingLines ||
      isCollision ||
      isAttraction ||
      isAttractionToCursor
    ) {
      for (let circle of Circle.allCircles) {
        if (isAttractionToCursor) {
          const distance = this.getDistance(
            this._x,
            this._y,
            mousePos.x,
            mousePos.y
          )
          const force = ((distance - this._radius) / distance) * isAttraction

          const angle = Math.atan2(mousePos.y - this._y, mousePos.x - this._x)
          const accelerationX =
            ((Math.cos(angle) * force) / this._mass) * massFactor // mass factor?
          const accelerationY =
            ((Math.sin(angle) * force) / this._mass) * massFactor // mass factor?

          this._velocity.x += accelerationX
          this._velocity.y += accelerationY
        }

        if (circle !== this) {
          const distance = this.getDistance(
            this._x,
            this._y,
            circle._x,
            circle._y
          )

          if (isAttraction) {
            const force = ((distance - this._radius) / distance) * isAttraction

            const angle = Math.atan2(circle._y - this._y, circle._x - this._x)
            const accelerationX =
              ((Math.cos(angle) * force) / this._mass) * massFactor // mass factor?
            const accelerationY =
              ((Math.sin(angle) * force) / this._mass) * massFactor // mass factor?

            this._velocity.x += accelerationX
            this._velocity.y += accelerationY
          }

          if (isDrawConnectingLines)
            this.isDrawConnectingLines(distance, ctx, circle)

          if (isCollision) {
            if (distance < this._radius + circle._radius) {
              const angle = Math.atan2(circle._y - this._y, circle._x - this._x)
              const targetX = this._x - Math.cos(angle)
              const targetY = this._y - Math.sin(angle)
              const velocityX = targetX - circle._x
              const velocityY = targetY - circle._y

              this._velocity.x += velocityX * 0.05
              this._velocity.y += velocityY * 0.05
            }
          }
        }
      }
    }
  }

  private isDrawConnectingLines(
    distance: number,
    ctx: CanvasRenderingContext2D,
    circle: Circle
  ) {
    if (distance < 500) {
      ctx.beginPath()
      ctx.moveTo(this._x, this._y)
      ctx.lineTo(circle._x, circle._y)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'white'
      ctx.stroke()
    }
  }

  private getDistance(x1: number, y1: number, x2: number, y2: number) {
    const xDistance = x2 - x1
    const yDistance = y2 - y1
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
  }

  public getInfo() {
    return {
      x: this._x,
      y: this._y,
      radius: this._radius,
      mass: this._mass,
      velocityX: this._velocity.x,
      velocityY: this._velocity.y,
    }
  }
}
