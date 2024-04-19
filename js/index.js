import Placer from "./Placer.js";
import Camera from "./Camera.js";
import * as menu from "./menu.js";

window.onload = () => {
  const canvas = document.getElementById("grid")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext("2d")
  const canvas_width = canvas.width
  const canvas_height = canvas.height

  let Placables = []

  const placer = new Placer(canvas, Placables);
  const camera = new Camera(canvas, Placables);
  camera.update()
  
  let isPrint = false;
  let isDrag = false;
  let isPlace = true;

  camera.canvas = canvas;

  canvas.addEventListener('mousemove', (e) => {
    let mouseX = e.offsetX
    let mouseY = e.offsetY
    camera.update()
    if (isPrint) {
      placer.print(mouseX, mouseY)
      objects.push({x: mouseX, y: mouseY})
    }
    if (isDrag) {
      camera.position.x = resultPos.x + (zeroPoint.x - mouseX);
      camera.position.y = resultPos.y + (zeroPoint.y - mouseY);
      camera.update()
    }
    if (isPlace) {
      placer.movePlacable(mouseX, mouseY, {x: camera.position.x, y: camera.position.y}, camera.scale)
    }
  })

  document.addEventListener("keypress", (e) => { // KEYPRESS
    if (isWorked) return;
    if (e.code == "Space") {
      console.log(isWorked);
      isWorked = true;
      slowClear(100)
    }
  })

  document.addEventListener("wheel", (e) => { // WHEEL
    let scrollType = e.deltaY;
    if (scrollType < 0) {
      camera.Scale.add(0.1)
    } else {
      camera.Scale.minus(0.1)
    }
  })

  let zeroPoint = undefined
  let resultPos = undefined
  canvas.addEventListener('mousedown', (e) => { // MOUSEDOWN
    isDrag = true;
    if (!isPlace) canvas.style.cursor = "grabbing"
    zeroPoint = {x: e.offsetX, y: e.offsetY}
    resultPos = {x: camera.position.x, y: camera.position.y}
  })

  canvas.addEventListener("mouseup", (e) => { // MOUSEUP
    isDrag = false;
    if (!isPlace) canvas.style.cursor = "grab"
  })

  canvas.addEventListener("mouseleave", (e) => { // MOUSELEAVE
    isPrint = false
    canvas.style.cursor = "default"
  })

  var menu_changeItem = () => {
    placer.Placeble.set(menu.getActiveItem(), {x: 0, y: 0})
  }

  menu.menu_changeItemHandler.push(menu_changeItem.bind(this, placer, menu.getActiveItem))
}

