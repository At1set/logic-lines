import Pen from "./Pen.js";

window.onload = () => {
  const canvas = document.getElementById("grid")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext("2d")
  const canvas_width = canvas.width
  const canvas_height = canvas.height

  const pen = new Pen(canvas);
  let objects = []
  
  let isPrint = false;

  canvas.addEventListener('mousemove', (e) => {
    let mouseX = e.offsetX
    let mouseY = e.offsetY
    if (isPrint) {
      pen.print(mouseX, mouseY)
      objects.push({x: mouseX, y: mouseY})
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

  canvas.addEventListener('mousedown', (e) => {
    isPrint = true;
  })

  canvas.addEventListener("mouseup", (e) => {
    isPrint = false;
    pen.lastPos = null
  })

  canvas.addEventListener("mouseleave", (e) => {
    isPrint = false
    pen.lastPos = null
  })
}

