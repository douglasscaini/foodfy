// FORM DELETE RECIPES AND CHEFS ADMIN PAGE
const formDelete = document.querySelector("#form-delete");

if (formDelete) {
  itemFormDelete(formDelete);
}

function itemFormDelete(formDelete) {
  formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Deseja realmente deletar?");

    if (!confirmation) {
      event.preventDefault();
    }
  });
}

// MENU ACTIVE ADMIN PAGE
const menuItems = document.querySelectorAll(".header-admin .links a");

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

// BUTTON ADD INGREDIENT AND STEPS PREPARATION
const classAddPreparation = document.querySelector(".add-preparation");
const classAddIngredient = document.querySelector(".add-ingredient");

if (classAddPreparation || classAddIngredient) {
  classAddPreparation.addEventListener("click", addPreparation);
  classAddIngredient.addEventListener("click", addIngredient);
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addPreparation() {
  const ingredients = document.querySelector("#preparation");
  const fieldContainer = document.querySelectorAll(".preparation");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

// UPLOAD PHOTOS LOGIC
const PhotosUploud = {
  input: "",
  preview: document.querySelector(".photos-preview"),
  uploudLimit: 5,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;

    PhotosUploud.input = event.target;

    if (PhotosUploud.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      PhotosUploud.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const div = PhotosUploud.getContainer(image);
        PhotosUploud.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUploud.input.files = PhotosUploud.getAllFiles();
  },

  hasLimit(event) {
    const { uploudLimit, input, preview } = PhotosUploud;
    const { files: fileList } = input;

    if (fileList.length > uploudLimit) {
      alert(`Envie no máximo ${uploudLimit} fotos!`);
      event.preventDefault();

      return true;
    }

    const photosDiv = [];

    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item);
      }
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploudLimit) {
      alert("Você atingiu o limite máximo de fotos!");
      event.preventDefault();

      return true;
    }

    return false;
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUploud.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");
    div.onclick = PhotosUploud.removePhoto;
    div.appendChild(image);
    div.appendChild(PhotosUploud.getRemoveButton());

    return div;
  },

  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },

  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUploud.preview.children);
    const index = photosArray.indexOf(photoDiv);
    PhotosUploud.files.splice(index, 1);
    PhotosUploud.input.files = PhotosUploud.getAllFiles();
    photoDiv.remove();
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]');

      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }

    photoDiv.remove();
  },
};

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
    const items = document.querySelectorAll("input, select");

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
