const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

async function format(recipe) {
  const recipeFiles = await File.findFilesRecipe(recipe.id);

  recipe.files = recipeFiles.map((file) => {
    file.path = file.path.replace("public", "");

    return file;
  });

  recipe.chef = await Chef.findOne({ where: { id: recipe.chef_id } });

  return recipe;
}

const loadRecipeService = {
  load(service, filter) {
    try {
      this.filter = filter;
      return this[service]();
    } catch (error) {
      console.error(error);
    }
  },

  async recipe() {
    try {
      const recipe = await Recipe.findOne(this.filter);

      return format(recipe);
    } catch (error) {
      console.error(error);
    }
  },

  async recipes() {
    try {
      const recipes = await Recipe.findAll(this.filter);

      const recipesPromise = recipes.map(format);

      return Promise.all(recipesPromise);
    } catch (error) {
      console.error(error);
    }
  },

  format,
};

module.exports = loadRecipeService;
