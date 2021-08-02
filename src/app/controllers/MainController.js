const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

const LoadRecipeService = require("../services/LoadRecipeService");
const LoadChefService = require("../services/LoadChefService");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await LoadRecipeService.load("recipes");

      return res.render("main/index.njk", { recipes: recipes.slice(0, 6) });
    } catch (error) {
      console.error(error);
    }
  },

  async about(req, res) {
    try {
      res.render("main/about.njk");
    } catch (error) {
      console.error(error);
    }
  },

  async recipes(req, res) {
    try {
      let { page, limit } = req.query;

      page = page || 1;
      limit = limit || 9;
      let offset = limit * (page - 1);

      let recipes = await Recipe.paginate({ limit, offset });

      const recipesPromise = recipes.map(LoadRecipeService.format);

      recipes = await Promise.all(recipesPromise);

      if (recipes == "") {
        return res.render("main/recipes.njk", { recipes });
      }

      const pagination = {
        total: Math.ceil(recipes[0].total / limit) || 0,
        page,
      };

      return res.render("main/recipes.njk", { recipes, pagination });
    } catch (error) {
      console.error(error);
    }
  },

  async showRecipe(req, res) {
    try {
      const recipe = await LoadRecipeService.load("recipe", { where: { id: req.params.id } });

      return res.render("main/show-recipe.njk", { recipe });
    } catch (error) {
      console.error(error);
    }
  },

  async chefs(req, res) {
    try {
      const chefs = await LoadChefService.load("chefs");

      return res.render("main/chefs.njk", { chefs });
    } catch (error) {
      console.error(error);
    }
  },

  async showChef(req, res) {
    try {
      const chef = await LoadChefService.load("chef", { where: { id: req.params.id } });

      return res.render("main/show-chef.njk", { chef });
    } catch (error) {
      console.error(error);
    }
  },

  async results(req, res) {
    try {
      const { filter } = req.query;

      let recipes = await Recipe.results(filter);

      const recipesPromise = recipes.map(LoadRecipeService.format);

      recipes = await Promise.all(recipesPromise);

      return res.render("main/results.njk", { recipes, filter });
    } catch (error) {
      console.error(error);
    }
  },
};
