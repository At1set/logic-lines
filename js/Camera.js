export default class Camera {
  constructor(canvas, Placebles, global) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.Placebles = Placebles
    this.global = global;
    this.position = { x: 0, y: 0 }
    this.scale = 1
    this.Scale = {
      add: (value) => {
        if (this.scale + value <= 4) {
          this.scale += value
          return this.update()
        }
      },
      minus: (value) => {
        if (this.scale - value >= 0.4) {
          this.scale -= value
          return this.update()
        }
      },
    }
    this.ceilSize = 100;
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

  WorldToCeil(x, y) {
    let ceilX;
    let ceilY;

    let gap = this.ceilSize * this.scale
    let c_w = this.canvas.width
    let c_h = this.canvas.height

    let ceilOffsetX = this.position.x % gap
    let ceilOffsetY = this.position.y % gap
    //  - ((c_w - gap / 2) / 2) % gap + ceilOffsetX
    //  - ((c_h - gap / 2) / 2) % gap + ceilOffsetY

    let ceilSize = this.ceilSize * this.scale/2
    ceilX = x - ((x + (((c_w - ceilSize*2) / 2) % gap)) % ceilSize)
    ceilY = y - ((y + (((c_h - ceilSize) / 2) % gap)) % ceilSize)

    console.log((y + (((c_h - ceilSize) / 2) % gap)) % ceilSize)
    return [ceilX, ceilY]
  }

  grid(offsetX, offsetY) {
    this.ctx.strokeStyle = "black"

    let gap = this.ceilSize*this.scale;
    let c_w = this.canvas.width;
    let c_h = this.canvas.height;

    let ceilOffsetX = offsetX % gap;
    let ceilOffsetY = offsetY % gap;

    for (
      let x = (((c_w - gap / 2) / 2) % gap) - ceilOffsetX - gap*3;
      x <= c_w - ceilOffsetX + gap*3;
      x += gap / 2
    ) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
      this.ctx.stroke()
      this.ctx.closePath()
    }

    for (
      let y = (((c_h - gap/2) / 2) % gap) + ceilOffsetY - gap*3;
      y <= c_h + ceilOffsetY + gap*3;
      y += gap / 2
    ) {
      this.ctx.beginPath()
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(c_w, y)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    this.ctx.fillRect(
      (this.canvas.width / 2) - this.position.x - gap/4,
      (this.canvas.height / 2) - this.position.y - gap/4,
      gap/2,
      gap/2
    )
  }
}