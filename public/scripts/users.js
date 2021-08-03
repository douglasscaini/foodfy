// BUTTON SHOW-HIDE IN RECIPE USERS PAGE
const buttonsShowHide = document.querySelectorAll(".button-show-hide");

if (buttonsShowHide) {
  const contentShowHide = document.querySelectorAll(".content-show-hide");

  ShowHide(buttonsShowHide, contentShowHide);
}

function ShowHide(buttonsShowHide, contentShowHide) {
  buttonsShowHide.forEach((button, index) => {
    button.addEventListener("click", () => {
      contentShowHide[index].classList.toggle("hide");
      buttonsShowHide[index].innerHTML = buttonsShowHide[index].innerHTML === "MOSTRAR" ? "ESCONDER" : "MOSTRAR";
    });
  });
}
