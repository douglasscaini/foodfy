// FORM DELETE RECIPES AND CHEFS ADMIN PAGE
const formDelete = document.querySelector('#form-delete')

if (formDelete) {
  itemFormDelete(formDelete)
}

function itemFormDelete(formDelete) {
  formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm("Deseja Deletar?")
    if (!confirmation) {
      event.preventDefault()
    }
  })
}

// MENU ACTIVE ADMIN PAGE
const menuItems = document.querySelectorAll('.header-admin .links a')

if (menuItems) {
  const currentPage = location.pathname
  menuActive(menuItems, currentPage)
}

function menuActive(menuItems, currentPage) {
  for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
      item.classList.add('active')
    }
  }
}

// BUTTON ADD INGREDIENT AND STEPS PREPARATION
const classAddPreparation = document.querySelector('.add-preparation')
const classAddIngredient = document.querySelector('.add-ingredient')

if (classAddPreparation || classAddIngredient) {
  classAddPreparation.addEventListener('click', addPreparation)
  classAddIngredient.addEventListener('click', addIngredient)
}

function addIngredient() {
  const ingredients = document.querySelector('#ingredients')
  const fieldContainer = document.querySelectorAll('.ingredient')

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if (newField.children[0].value == '') return false

  newField.children[0].value = ''
  ingredients.appendChild(newField)
}

function addPreparation() {
  const ingredients = document.querySelector('#preparation')
  const fieldContainer = document.querySelectorAll('.preparation')

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if (newField.children[0].value == '') return false

  newField.children[0].value = ''
  ingredients.appendChild(newField)
}