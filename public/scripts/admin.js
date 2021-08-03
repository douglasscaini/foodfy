// FORM DELETE RECIPES AND CHEFS ADMIN PAGE
const formDelete = document.querySelector("#form-delete");

if (formDelete) {
  itemFormDelete(formDelete);
}

const usersFormDelete = document.querySelectorAll(".form-delete");
usersFormDelete.forEach((form) => itemFormDelete(form));

function itemFormDelete(formDelete) {
  formDelete.addEventListener("submit", function (event) {
    const confirmation = confirm("Deseja realmente deletar?");

    if (!confirmation) {
      event.preventDefault();
    }
  });
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
