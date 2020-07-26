// REDIRECT CLICK RECIPE
const cards = document.querySelectorAll('.card')

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        window.location.href = `/recipes/${index + 1}`
    })
})

// BUTTON SHOW-HIDE IN RECIPE PAGE
const buttonsShowHide = document.querySelectorAll('.button-show-hide')
const divs = document.querySelectorAll('.content-show-hide')

buttonsShowHide.forEach((button, index) => {
    button.addEventListener('click', () => {
        divs[index].classList.toggle('hide')
        buttonsShowHide[index].innerHTML = buttonsShowHide[index].innerHTML === 'MOSTRAR' ? 'ESCONDER' : 'MOSTRAR'
    })
})

// MENU ACTIVE USERS PAGE
const currentPage = location.pathname
const menuItems = document.querySelectorAll('.header-users .links a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}