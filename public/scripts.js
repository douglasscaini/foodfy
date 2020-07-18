const buttons = document.querySelectorAll('.button-show-hide')
const divs = document.querySelectorAll('.content-show-hide')
const cards = document.querySelectorAll('.card')

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        window.location.href = `/recipes/${index}`
    })
})

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        divs[index].classList.toggle('hide')
        buttons[index].innerHTML = buttons[index].innerHTML === 'MOSTRAR' ? 'ESCONDER' : 'MOSTRAR'
    })
})