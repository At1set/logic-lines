export default class Camera {
  constructor(canvas, pen) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.position = { x: 0, y: 0 }
    this.MapStore = [
      { position: { x: canvas.width / 2 -60, y: canvas.height / 2 + 35 } },
    ]
    this.scale = 1
    this.Scale = {
      add: (value) => {
        if (this.scale + value <= 4) {
          this.scale += value
          return this.update()
        }
      },
      minus: (value) => {
        if (this.scale - value >= 0.2) {
          this.scale -= value
          console.log(this.scale)
          return this.update()
        }
      },
    }
    this.pen = pen
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.MapStore.forEach((object) => {
      this.ctx.beginPath()
      this.ctx.fillRect(
        object.position.x + this.position.x,
        object.position.y - this.position.y,
        100 * this.scale,
        100 * this.scale
      )
      this.ctx.closePath()
      this.grid(this.position.x, -this.position.y)
    })
  }

  grid(offsetX, offsetY) {
    for (let i = 0; i < this.canvas.width / 10; i++) {
      let x = i * 100 * this.scale // Масштаб
      this.ctx.beginPath()
      this.ctx.moveTo(x + offsetX, 0)
      this.ctx.lineTo(x + offsetX, this.canvas.height)
      this.ctx.stroke()
      this.ctx.closePath()
    }
    for (let i = 0; i < this.canvas.height / 10; i++) {
      let y = i * 100 * this.scale // Масштаб
      this.ctx.beginPath()
      this.ctx.moveTo(0, y + offsetY)
      this.ctx.lineTo(this.canvas.width, y + offsetY)
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }
}