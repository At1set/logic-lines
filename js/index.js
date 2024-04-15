import Placer from "./Placer.js";
import Camera from "./Camera.js";
import "./menu.js";

window.onload = () => {
  const canvas = document.getElementById("grid")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext("2d")
  const canvas_width = canvas.width
  const canvas_height = canvas.height

  const placer = new Placer(canvas);
  const camera = new Camera(canvas, placer);
  
  let objects = []
  
  let isPrint = false;
  let isDrag = false;
  let isPlace = true;

  camera.canvas = canvas;

  canvas.addEventListener('mousemove', (e) => {
    let mouseX = e.offsetX
    let mouseY = e.offsetY
    if (isPrint) {
      placer.print(mouseX, mouseY)
      objects.push({x: mouseX, y: mouseY})
    }
    if (isDrag) {
      camera.position.x = resultPos.x - (zeroPoint.x - mouseX);
      camera.position.y = resultPos.y + (zeroPoint.y - mouseY);
      camera.update()
    }
    if (isPlace) {
      canvas.style.cursor = "none"
      camera.update()
      ctx.fillRect(
        mouseX - 50 * camera.scale,
        mouseY - 50 * camera.scale,
        100 * camera.scale,
        100 * camera.scale
      )
    }
  })

  let isWorked = false;
  function slowClear(delay) {
    if (objects.length <= 0) return;
    setTimeout(() => {
      let coord = objects[0]
      ctx.clearRect(coord.x-20, coord.y-20, 20, 20)
      objects.shift()
      if (objects.length > 0) return slowClear()
      isWorked = false
      return
    }, delay)
  }

  document.addEventListener("keypress", (e) => {
    if (isWorked) return;
    if (e.code == "Space") {
      console.log(isWorked);
      isWorked = true;
      slowClear(100)
    }
  })

  document.addEventListener("wheel", (e) => {
    let scrollType = e.deltaY;
    if (scrollType < 0) {
      camera.Scale.add(0.1)
    } else {
      camera.Scale.minus(0.1)
    }
  })


  let zeroPoint = undefined
  let resultPos = undefined
  canvas.addEventListener('mousedown', (e) => {
    // isPrint = true;
    isDrag = true;
    canvas.style.cursor = "grabbing"
    zeroPoint = {x: e.offsetX, y: e.offsetY}
    resultPos = {x: camera.position.x, y: camera.position.y}
  })

  canvas.addEventListener("mouseup", (e) => {
    // isPrint = false;
    // placer.lastPos = null
    isDrag = false;
    canvas.style.cursor = "grab"
  })

  canvas.addEventListener("mouseleave", (e) => {
    isPrint = false
    placer.lastPos = null
  })

  
}

