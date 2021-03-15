const Recipe = require("../../models/Recipe");
const Chef = require("../../models/Chef");
const File = require("../../models/File");
const FileRecipe = require("../../models/FileRecipe");

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

      const recipesPromise = recipes.map(async (recipe) => {
        recipe.file = await getImage(recipe.id);

        return recipe;
      });

      let recipesList = await Promise.all(recipesPromise);

      return res.render("admin/recipes/index", { recipes: recipesList });
    } catch (error) {
      console.error(`Erro na exibição das receitas! ${error}`);
    }
  },

  async create(req, res) {
    try {
      const chefsOptions = await Chef.chefsSelectOptions();

      return res.render("admin/recipes/create", { chefsOptions });
    } catch (error) {
      console.error(`Erro na exibição da criação das receitas! ${error}`);
    }
  },

  async post(req, res) {
    try {
      if (req.files.length === 0) {
        return res.send("Por favor, envie no mínimo 1 foto!");
      }

      const filePromise = req.files.map((file) =>
        File.create({ name: file.filename, path: file.path.replace(/\\/g, "/") })
      );

      let fileIds = await Promise.all(filePromise);

      let recipeId = await Recipe.create(req.body);

      const recipeFilesPromise = fileIds.map((fileId) =>
        File.createRecipeFiles({
          recipe_id: recipeId,
          file_id: fileId,
        })
      );

      await Promise.all(recipeFilesPromise);

      return res.redirect(`/admin/recipes/`);
    } catch (error) {
      console.error(`Erro na criação das receitas! ${error}`);
    }

    return res.redirect(`/admin/recipes`);
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

      return res.render("admin/recipes/show", { recipe, files: filesRecipe });
    } catch (error) {
      console.error(`Erro na exibição da receita! ${error}`);
    }
  },

  async edit(req, res) {
    try {
      const recipe = await Recipe.find(req.params.id);

      if (!recipe) return res.send("Receita não encontrada!");

      const chefsOptions = await Chef.chefsSelectOptions();

      let filesRecipe = await Recipe.getRecipeFiles(recipe.id);

      filesRecipe = filesRecipe.map((file) => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
      }));

      return res.render("admin/recipes/edit", { recipe, chefsOptions, filesRecipe });
    } catch (error) {
      console.error(`Erro na exibição da edição da receita! ${error}`);
    }
  },

  async put(req, res) {
    try {
      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(async (file) => {
          const file_id = await File.create({
            name: file.filename,
            path: file.path.replace(/\\/g, "/"),
          });

          await File.createRecipeFiles({ recipe_id: req.body.id, file_id });
        });

        await Promise.all(newFilesPromise);
      }

      Recipe.update(req.body);

      if (req.body.removed_files) {
        let removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);

        const removedFilesPromise = removedFiles.map(async (id) => {
          await FileRecipe.delete(id);
          await File.delete(id);
        });

        await Promise.all(removedFilesPromise);
      }

      return res.redirect(`/admin/recipes/${req.body.id}`);
    } catch (error) {
      console.error(`Erro na atualização da receita! ${error}`);
    }
  },

  async delete(req, res) {
    try {
      let recipeFiles = await Recipe.getRecipeFiles(req.body.id);

      recipeFiles = recipeFiles.map(async (file) => {
        await FileRecipe.delete(file.file_id);
        await File.delete(file.file_id);
      });

      await Recipe.delete(req.body.id);

      return res.redirect("/admin/recipes");
    } catch (error) {
      console.error(`Erro na exclusão da receita! ${error}`);
    }
  },
};
