import Placable from "./Placable.js";

export default class Placer {
  constructor (canvas, Placables) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.Placables = Placables
    this.lastPos = null
    this.ctx.lineJoin = "round"
    this.ctx.lineCap = "round"
    this.placeble = undefined;
    this.Placeble  = {
      get: () => {
        return placeble
      },
      set: (type, position) => {
        if (!["Square"].includes(type)) {
          this.placeble = undefined;
          throw new Error("Нет такого placeble!")
        }
        return this.placeble = new Placable(position, type);
      }
    }
  }

  movePlacable(ceilX, ceilY, offset, camera_scale) {
    if (this.placeble) {
      ceilX -= (ceilX % (100 * camera_scale)) 
      ceilY -= (ceilY % (100 * camera_scale)) 
      this.placeble.position = {x: ceilX, y: ceilY}
      this.ctx.fillRect(
        this.placeble.position.x * camera_scale + offset.x,
        this.placeble.position.y * camera_scale - offset.y,
        100 * camera_scale,
        100 * camera_scale
      )
    }
  }

  place () {
    if (this.Placeble.get() != undefined) {
      this.Placables.push(this.placeble)
    }
  }
}