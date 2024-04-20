import Placable from "./Placable.js";

export default class Placer {
  constructor (canvas, Placables, global) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.Placables = Placables
    this.global = global
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

  movePlacable(x, y) {
    if (!this.placeble) return
    let ceilSize = this.global.camera.ceilSize;
    let camera_scale = this.global.camera.scale;

    let ceilX;
    let ceilY

    [ceilX, ceilY] = this.global.camera.WorldToCeil(x, y)
    // console.log(ceilX, ceilY);

    let size = ceilSize*camera_scale
    this.ctx.fillRect(
      ceilX,
      ceilY,
      10,
      10
    )
    this.placeble.moveTo(ceilX, ceilY)
  }

  place () {
    if (this.Placeble.get() != undefined) {
      this.Placables.push(this.placeble)
    }
  }
}