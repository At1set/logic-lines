export default class Pen {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.lastPos = null
    // this.ctx.strokeStyle = this.color
    this.ctx.lineJoin = "round"
    this.ctx.lineCap = "round"
  }

  print(x, y) {
    this.ctx.beginPath();
    if (this.lastPos != null) {
      this.ctx.lineWidth = 5;
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
    this.ctx.closePath()
    this.lastPos = {x, y}
  }
}