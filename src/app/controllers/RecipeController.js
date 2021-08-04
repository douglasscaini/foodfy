const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");
const FileRecipe = require("../models/FileRecipe");

const LoadRecipeService = require("../services/LoadRecipeService");

const { unlinkSync } = require("fs");

module.exports = {
  async index(req, res) {
    try {
      let { page, limit } = req.query;

      page = page || 1;
      limit = limit || 10;
      let offset = limit * (page - 1);

      let recipes = await Recipe.paginate({ limit, offset });

      const recipesPromise = recipes.map(LoadRecipeService.format);

      recipes = await Promise.all(recipesPromise);

      if (recipes == "") {
        return res.render("admin/recipes/index.njk", { recipes });
      }

      const pagination = {
        total: Math.ceil(recipes[0].total / limit) || 0,
        page,
      };

      return res.render("admin/recipes/index.njk", { recipes, pagination });
    } catch (error) {
      console.error(error);
    }
  },

  async create(req, res) {
    try {
      const chefs = await Chef.findAll();

      return res.render("admin/recipes/create.njk", { chefs });
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      const { chef_id, title, ingredients, preparation, information } = req.body;

      let recipe_id = await Recipe.create({
        user_id: req.session.userId,
        chef_id,
        title,
        ingredients,
        preparation,
        information,
      });

      const filesPromise = req.files.map(async (file) => {
        const file_id = await File.create({ name: file.filename, path: file.path.replace(/\\/g, "/") });

        await FileRecipe.create({ recipe_id, file_id });
      });

      await Promise.all(filesPromise);

      return res.render(`parts/animations/success.njk`, {
        message: "Receita cadastrada com sucesso!",
        url: `/admin/recipes/${recipe_id}`,
        button: "Exibir Receita",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    try {
      const recipe = await LoadRecipeService.load("recipe", { where: { id: req.params.id } });

      return res.render("admin/recipes/show.njk", { recipe });
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const recipe = await LoadRecipeService.load("recipe", { where: { id: req.params.id } });

      const chefs = await Chef.findAll();

      return res.render("admin/recipes/edit.njk", { recipe, chefs });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const { id, chef_id, title, ingredients, preparation, information } = req.body;

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);

        const removedFilesPromise = removedFiles.map(async (id) => {
          const fileRecipe = await FileRecipe.findOne({ where: { file_id: id } });
          await FileRecipe.delete(fileRecipe.id);

          const file = await File.findOne({ where: { id } });
          unlinkSync(file.path);
          await File.delete(file.id);
        });

        await Promise.all(removedFilesPromise);
      }

      if (req.files.length != 0) {
        const oldFiles = await File.findFilesRecipe(id);
        const totalFiles = oldFiles.length + req.files.length;

        if (totalFiles <= 5) {
          const newFilesPromise = req.files.map(async (file) => {
            const file_id = await File.create({ name: file.filename, path: file.path.replace(/\\/g, "/") });

            await FileRecipe.create({ recipe_id: id, file_id });
          });

          await Promise.all(newFilesPromise);
        }
      }

      Recipe.update(id, { chef_id, title, ingredients, preparation, information });

      return res.render(`parts/animations/success.njk`, {
        message: "Receita atualizada com sucesso!",
        url: `/admin/recipes/user-recipes`,
        button: "Minhas Receitas",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      let recipesFile = await File.findFilesRecipe(req.body.id);

      recipesFile.map(async (file) => {
        const fileRecipe = await FileRecipe.findOne({ where: { file_id: file.id } });
        await FileRecipe.delete(fileRecipe.id);

        unlinkSync(file.path);
        await File.delete(file.id);
      });

      await Recipe.delete(req.body.id);

      return res.render(`parts/animations/delete.njk`, {
        message: "Receita deletada com sucesso!",
        url: `/admin/recipes/user-recipes`,
        button: "Minhas Receitas",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async userRecipes(req, res) {
    try {
      const { userId } = req.session;

      const recipesUser = await Recipe.findRecipesUser(userId);

      const recipesPromise = recipesUser.map(LoadRecipeService.format);

      recipes = await Promise.all(recipesPromise);

      return res.render("admin/recipes/index.njk", { recipes });
    } catch (error) {
      console.error(error);
    }
  },
};
