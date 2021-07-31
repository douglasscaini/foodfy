const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");
const FileRecipe = require("../models/FileRecipe");

const LoadRecipeService = require("../services/LoadRecipeService");

const { unlinkSync } = require("fs");

module.exports = {
  async index(req, res) {
    try {
      const recipes = await LoadRecipeService.load("recipes");

      return res.render("admin/recipes/index.njk", { recipes });
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

      return res.redirect(`/admin/recipes/${recipe_id}`);
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

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(async (file) => {
          const file_id = await File.create({ name: file.filename, path: file.path.replace(/\\/g, "/") });

          await FileRecipe.create({ recipe_id: id, file_id });
        });

        await Promise.all(newFilesPromise);
      }

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

      Recipe.update(id, { chef_id, title, ingredients, preparation, information });

      return res.redirect(`/admin/recipes/${id}`);
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

      return res.redirect("/admin/recipes");
    } catch (error) {
      console.error(error);
    }
  },
};
