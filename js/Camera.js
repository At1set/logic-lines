export default class Camera {
  constructor(canvas, Placebles) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.Placebles = Placebles
    this.position = { x: 0, y: 0 }
    this.scale = 1
    this.Scale = {
      add: (value) => {
        if (this.scale + value <= 4) {
          this.scale += value
          return this.update(true, "+")
        }
      },
      minus: (value) => {
        if (this.scale - value >= 0.2) {
          this.scale -= value
          console.log(this.scale)
          return this.update(true, "-")
        }
      },
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.Placebles.forEach((object) => {
      this.ctx.beginPath()
      this.ctx.fillRect(
        object.position.x * this.scale - this.position.x,
        object.position.y * this.scale - this.position.y,
        100 * this.scale,
        100 * this.scale
      )
      this.ctx.closePath()
    })
    this.grid(this.position.x, -this.position.y)
  }

  grid(offsetX, offsetY) {
    this.ctx.strokeStyle = "black"
    // for (let i = 0; i < this.canvas.width / 10; i++) {
    //   let x = i * 100 * this.scale // Масштаб
    //   this.ctx.beginPath()
    //   this.ctx.moveTo(x + offsetX, 0)
    //   this.ctx.lineTo(x + offsetX, this.canvas.height)
    //   this.ctx.stroke()
    //   this.ctx.closePath()
    // }
    // for (let i = 0; i < this.canvas.height / 10; i++) {
    //   let y = i * 100 * this.scale // Масштаб
    //   this.ctx.beginPath()
    //   this.ctx.moveTo(0, y + offsetY)
    //   this.ctx.lineTo(this.canvas.width, y + offsetY)
    //   this.ctx.stroke()
    //   this.ctx.closePath()
    // }

    let gap = 100*this.scale;
    let c_w = this.canvas.width
    let c_h = this.canvas.height
    for (
      let x = (((c_w - gap) / 2) % gap) - offsetX;
      x <= c_w - offsetX;
      x += gap / 2
    ) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
      this.ctx.stroke()
      this.ctx.closePath()
    }

    for (
      let y = (((c_h - gap) / 2) % gap) + offsetY;
      y <= c_h + offsetY;
      y += gap / 2
    ) {
      this.ctx.beginPath()
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(c_w, y)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(
      (this.canvas.width / 2) - this.position.x - gap/2,
      (this.canvas.height / 2) - this.position.y - gap/2,
      gap/2,
      gap/2
    )
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.canvas.width / 2 - 5, this.canvas.height / 2 - 5, 5, 5)
  }
}