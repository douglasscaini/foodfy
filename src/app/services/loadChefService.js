const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");
const FileRecipe = require("../models/FileRecipe");

async function getImages(id) {
  const file = await File.findOne({ where: { id } });

  file.path = file.path.replace("public", "");

  return file;
}

async function format(chef) {
  chef.file = await getImages(chef.file_id);

  let recipesChef = await Recipe.findRecipesChef(chef.id);

  if (recipesChef.length > 0) {
    const recipesChefFilesPromise = recipesChef.map(async (recipe) => {
      const fileRecipe = await FileRecipe.findOne({ where: { recipe_id: recipe.id } });

      if (!fileRecipe) {
        recipe.file = { path: "/images/placeholder.png" };
      } else {
        recipe.file = await getImages(fileRecipe.file_id);
      }

      return recipe;
    });

    chef.recipes = await Promise.all(recipesChefFilesPromise);
  }

  return chef;
}

const loadChefService = {
  load(service, filter) {
    try {
      this.filter = filter;
      return this[service]();
    } catch (error) {
      console.error(error);
    }
  },

  async chef() {
    try {
      const chef = await Chef.findOne(this.filter);

      return format(chef);
    } catch (error) {
      console.error(error);
    }
  },

  async chefs() {
    try {
      const chefs = await Chef.findAll(this.filter);

      const chefsPromise = chefs.map(format);

      return Promise.all(chefsPromise);
    } catch (error) {
      console.error(error);
    }
  },

  format,
};

module.exports = loadChefService;
