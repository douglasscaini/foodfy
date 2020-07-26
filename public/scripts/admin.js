// BUTTON ADD INGREDIENT AND STEPS PREPARATION
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

document.querySelector('.add-preparation').addEventListener('click', addPreparation)
document.querySelector('.add-ingredient').addEventListener('click', addIngredient)

// FORM DELETE CONFIRMATION
const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm("Deseja deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})