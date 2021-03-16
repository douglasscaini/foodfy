const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    try {
      let recipes = await Recipe.all();

      async function getImage(recipeId) {
        let results = await Recipe.getRecipeFiles(recipeId);

        results = results.map((recipe) => ({
          ...recipe,
          src: `${req.protocol}://${req.headers.host}${recipe.path.replace("public", "")}`,
        }));

        return results[0];
      }

      let recipesPromise = recipes.map(async (recipe) => {
        recipe.file = await getImage(recipe.id);

        return recipe;
      });

      let recipesList = await Promise.all(recipesPromise);

      return res.render("users/index", { recipes: recipesList.slice(0, 6) });
    } catch (error) {
      console.error(`Erro na exibição principal! ${error}`);
    }
  },

  async about(req, res) {
    res.render("users/about");
  },

  recipes(req, res) {
    try {
      let { page, limit } = req.query;

      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);

      const params = {
        page,
        limit,
        offset,
        async callback(recipes) {
          if (recipes[0] == undefined) {
            res.send("Ao menos uma receita deve ser cadastrada antes da visualização!");
          } else {
            const pagination = {
              total: Math.ceil(recipes[0].total / limit) || 0,
              page,
            };

            async function getImage(recipeId) {
              let results = await Recipe.getRecipeFiles(recipeId);

              results = results.map((recipe) => ({
                ...recipe,
                src: `${req.protocol}://${req.headers.host}${recipe.path.replace("public", "")}`,
              }));

              return results[0];
            }

            const recipesPromise = recipes.map(async (recipe) => {
              recipe.file = await getImage(recipe.id);

              return recipe;
            });

            let recipesList = await Promise.all(recipesPromise);

            return res.render("users/recipes", { recipes: recipesList, pagination });
          }
        },
      };

      Recipe.paginate(params);
    } catch (error) {
      console.error(`Erro na exibição das receitas dos users! ${error}`);
    }
  },

  async show(req, res) {
    try {
      let recipe = await Recipe.find(req.params.id);

      if (!recipe) return res.send("Receita não encontrada!");

      let filesRecipe = await Recipe.getRecipeFiles(recipe.id);

      filesRecipe = filesRecipe.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
      }));

      return res.render("users/show", { recipe, files: filesRecipe });
    } catch (error) {
      console.error(`Erro na exibição da receita dos users! ${error}`);
    }
  },

  async chefs(req, res) {
    try {
      let chefs = await Chef.findCountRecipes();

      async function getImage(chefId) {
        let results = await File.getChefFiles(chefId);

        results = results.map((file) => ({
          ...file,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
        }));

        return results[0];
      }

      const chefsPromise = chefs.map(async (chef) => {
        chef.file = await getImage(chef.id);

        return chef;
      });

      let chefsList = await Promise.all(chefsPromise);

      return res.render("users/chefs", { chefs: chefsList });
    } catch (error) {
      console.error(`Erro na exibição das receitas dos users! ${error}`);
    }
  },

  async results(req, res) {
    try {
      const recipes = await Recipe.results(req.query.filter);

      async function getImage(recipeId) {
        let results = await Recipe.getRecipeFiles(recipeId);

        results = results.map((recipe) => ({
          ...recipe,
          src: `${req.protocol}://${req.headers.host}${recipe.path.replace("public", "")}`,
        }));

        return results[0];
      }

      const recipesPromise = recipes.map(async (recipe) => {
        recipe.file = await getImage(recipe.id);

        return recipe;
      });

      let recipesList = await Promise.all(recipesPromise);

      const filter = req.query.filter;
      return res.render("users/results", { recipes: recipesList, filter });
    } catch (error) {
      console.error(`Erro na exibição dos resultados das pesquisas! ${error}`);
    }
  },
};
