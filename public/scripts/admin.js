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
const PhotosUpload = {
  input: "",
  preview: document.querySelector(".photos-preview"),
  uploadLimit: "",
  files: [],
  handleFileInput(event, uploadLimit) {
    const { files: fileList } = event.target;

    PhotosUpload.input = event.target;
    PhotosUpload.uploadLimit = uploadLimit;

    if (PhotosUpload.hasLimit(event)) {
      PhotosUpload.updateInputFiles();

      return;
    }

    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const div = PhotosUpload.getContainer(image);
        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.updateInputFiles();
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos!`);
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

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos!");
      event.preventDefault();

      return true;
    }

    return false;
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  getContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");
    div.onclick = PhotosUpload.removePhoto;
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());

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
    const newFiles = Array.from(PhotosUpload.preview.children).filter(function (file) {
      if (file.classList.contains("photo") && !file.getAttribute("id")) return true;
    });

    const index = newFiles.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);

    PhotosUpload.updateInputFiles();
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

  updateInputFiles() {
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
};
