export default class Placable {
  constructor (position, type) {
    this.position = position;
    this.isPlaced = false;
    this.color = "#504444bd";
  }

  moveTo (x, y) {
    this.position.x = x
    this.position.y = y
  }
}