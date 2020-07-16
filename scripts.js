const modalOverlay = document.querySelector('.modal-overlay')
const modalContent = document.querySelector('.modal-content')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        modalOverlay.classList.add('active')
        modalContent.innerHTML = card.innerHTML
    })
}

document.querySelector('.close-modal').addEventListener('click', () => {
    modalOverlay.classList.remove('active')
})