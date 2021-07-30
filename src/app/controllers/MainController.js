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

      return res.render("main/index.njk", { recipes: recipesList.slice(0, 6) });
    } catch (error) {
      console.error(`Erro na exibição principal! ${error}`);
    }
  },

  async about(req, res) {
    res.render("main/about.njk");
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
            return res.render("main/recipes.njk");
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

            return res.render("main/recipes.njk", { recipes: recipesList, pagination });
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

      return res.render("main/show.njk", { recipe, files: filesRecipe });
    } catch (error) {
      console.error(`Erro na exibição da receita dos users! ${error}`);
    }
  },

  async chefs(req, res) {
    try {
      // VER MODEL
      // let chefs = await Chef.findCountRecipes();

      // async function getImage(id) {
      //   console.log(id);

      //   const file = await File.findOne({ where: { id } });
      //   console.log(file);
      //   // let results = await File.findOne({ where: { id } });
      //   // console.log(results);
      //   // const fileChef = results.forEach((file) => ({
      //   //   ...file,
      //   //   src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
      //   // }));
      //   // return fileChef;
      // }

      // const chefsPromise = chefs.map(async (chef) => {
      //   chef.file = await getImage(chef.file_id);

      //   return chef;
      // });

      // let chefsList = await Promise.all(chefsPromise);

      let chefs = await Chef.findAll();

      chefs = chefs.map((chef) => ({
        ...chef,
        src: `${req.protocol}://${req.headers.host}${chef.file.replace("public", "")}`,
      }));

      console.log(chefs);

      return res.render("main/chefs.njk", { chefs });
    } catch (error) {
      console.error(error);
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
      return res.render("main/results.njk", { recipes: recipesList, filter });
    } catch (error) {
      console.error(`Erro na exibição dos resultados das pesquisas! ${error}`);
    }
  },
};
