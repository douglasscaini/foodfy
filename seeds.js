const User = require("./src/app/models/User");
const Chef = require("./src/app/models/Chef");
const File = require("./src/app/models/File");
const Recipe = require("./src/app/models/Recipe");
const FileRecipe = require("./src/app/models/FileRecipe");

const faker = require("faker");
const { hash } = require("bcryptjs");

let usersId = [];
let chefsId = [];

function createFiles(interactionQuantity, modelType) {
  let files = [];

  for (let numberImage = 1; files.length < interactionQuantity; numberImage++) {
    files.push({
      name: faker.image.image(),
      path: `public/images/${modelType}s/${modelType}-${numberImage}.jpg`,
    });
  }

  return files;
}

async function createUsers() {
  const users = [];
  const password = await hash("123", 8);

  while (users.length < 20) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email().toLowerCase(),
      password,
      is_admin: faker.datatype.boolean(),
    });
  }

  const usersPromise = users.map((user) => User.create(user));
  usersId = await Promise.all(usersPromise);
}

async function createChefs() {
  const chefs = [];

  const files = createFiles(20, "chef");
  const filesPromise = files.map((file) => File.create(file));
  const filesId = await Promise.all(filesPromise);

  for (let fileIndex = 0; chefs.length < 20; fileIndex++) {
    chefs.push({
      file_id: filesId[fileIndex],
      name: faker.name.firstName(),
    });
  }

  const chefsPromise = chefs.map((chef) => Chef.create(chef));
  chefsId = await Promise.all(chefsPromise);
}

async function createRecipes() {
  let recipes = [],
    ingredients = [],
    preparation = [];

  for (let i = 0; i < 5; i++) {
    ingredients.push(faker.lorem.sentence());
    preparation.push(faker.lorem.sentence());
  }

  while (recipes.length < 20) {
    recipes.push({
      chef_id: chefsId[Math.floor(Math.random() * 20)],
      user_id: usersId[Math.floor(Math.random() * 20)],
      title: faker.commerce.productName(),
      ingredients,
      preparation,
      information: faker.lorem.paragraphs(),
    });
  }

  const recipesPromise = recipes.map((recipe) => Recipe.create(recipe));
  const recipesId = await Promise.all(recipesPromise);

  const files = createFiles(20, "recipe");
  const filesPromise = files.map((file) => File.create(file));
  const filesId = await Promise.all(filesPromise);

  let recipeFiles = [];

  for (let fileIndex = 0; recipeFiles.length < 20; fileIndex++) {
    recipeFiles.push({
      recipe_id: recipesId[fileIndex],
      file_id: filesId[fileIndex],
    });
  }

  const recipeFilesPromise = recipeFiles.map((recipeFile) => FileRecipe.create(recipeFile));
  await Promise.all(recipeFilesPromise);
}

async function init() {
  await createUsers();
  await createChefs();
  await createRecipes();
}

init();
