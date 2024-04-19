const menu = document.querySelector(".menu-items")
let items = menu.querySelectorAll(".menu-items__item")

export let menu_changeItemHandler = []

menu.addEventListener("click", (e) => {
  if (e.target.classList.contains('menu-items__item')) {
    items.forEach((item) => {
      item.classList.remove("_active")
    })
    e.target.classList.add("_active")
    if (menu_changeItemHandler.length > 0) {
      menu_changeItemHandler.forEach((func) => {
        func()
      })
    }
  }
})

export function getActiveItem() {
  items = Array.from(items)
  return ["Square", "Square", "Square", "Square", "Square", "Square"][
    items.indexOf(items.find((item) => item.classList.contains("_active")))
  ]
}