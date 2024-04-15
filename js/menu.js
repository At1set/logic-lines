const menu = document.querySelector(".menu-items")
let items = menu.querySelectorAll(".menu-items__item")

menu.addEventListener("click", (e) => {
  if (e.target.classList.contains('menu-items__item')) {
    items.forEach((item) => {
      item.classList.remove("_active")
    })
    e.target.classList.add("_active")
  }
})

function getActiveItem() {
  items.forEach((item, index) => {
    if (item.classList.contains('_active')) return index+1
  })
}