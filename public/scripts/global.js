// MENU ACTIVE
const menuItems = document.querySelectorAll(".links a");

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

// VALIDATE EMAIL
const Validate = {
  apply(input, func) {
    Validate.clearErrors(input);

    let results = Validate[func](input.value);
    input.value = results.value;

    if (results.error) {
      Validate.displayError(input, results.error);
    }
  },

  displayError(input) {
    input.classList.add("email-error");
    input.focus();
  },

  clearErrors(input) {
    input.classList.remove("email-error");
  },

  isEmail(value) {
    let error = null;
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!value.match(mailFormat)) {
      error = "Email inválido!";
    }

    return {
      error,
      value,
    };
  },

  allFields(event) {
    const items = document.querySelectorAll("input");

    for (item of items) {
      if (item.value == "") {
        const message = document.createElement("div");
        message.classList.add("messages");
        message.classList.add("error");
        message.style.position = "fixed";
        message.innerHTML = "Todos os campos são obrigatórios!";
        document.querySelector("body").append(message);

        event.preventDefault();
      }
    }
  },
};

// IMAGE GALLERY LOGIC
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
