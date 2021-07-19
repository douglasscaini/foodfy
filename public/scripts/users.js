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
      buttonsShowHide[index].innerHTML =
        buttonsShowHide[index].innerHTML === "MOSTRAR" ? "ESCONDER" : "MOSTRAR";
    });
  });
}

// MENU ACTIVE USERS PAGE
const menuItems = document.querySelectorAll(".header-users .links a");

if (menuItems) {
  const currentPage = location.pathname;

  menuActive(menuItems, currentPage);
}

function menuActive(menuItems, currentPage) {
  for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
      item.classList.add("active");
    }
  }
}

// PAGINATE
const pagination = document.querySelector(".pagination");

if (pagination) {
  createPagination(pagination);
}

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;

    if (firstAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }
  return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);

  let elements = "";

  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`;
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        elements += `<a href="?page=${page}">${page}</a>`;
      }
    }
  }

  pagination.innerHTML = elements;
}

const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll(".gallery-preview img"),
  setImage(event) {
    const { target } = event;

    ImageGallery.previews.forEach((preview) => preview.classList.remove("active"));

    target.classList.add("active");

    ImageGallery.highlight.src = target.src;
  },
};
