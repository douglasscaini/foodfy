const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

const { unlinkSync } = require("fs");

module.exports = {
  async index(req, res) {
    try {
      let chefs = await Chef.findAll();

      chefs = chefs.map((chef) => ({
        ...chef,
        src: `${req.protocol}://${req.headers.host}${chef.file.replace("public", "")}`,
      }));

      return res.render("admin/chefs/index.njk", { chefs });
    } catch (error) {
      console.error(error);
    }
  },

  create(req, res) {
    try {
      return res.render("admin/chefs/create.njk");
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      if (req.files.length === 0) {
        return res.send("Por favor, envie 1 foto!");
      }

      const filesPromise = req.files.map((file) =>
        File.create({ name: file.filename, path: file.path.replace(/\\/g, "/") })
      );

      const fileId = await Promise.all(filesPromise);

      await Chef.create({ file_id: fileId[0], name: req.body.name });

      return res.redirect("/admin/chefs");
    } catch (error) {
      console.error(`Erro na criação do chef! ${error}`);
    }
  },

  async show(req, res) {
    try {
      const chef = await Chef.findOne({ where: { id: req.params.id } });

      let file = await Chef.getChefFile(chef.id);

      file = {
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
      };

      const recipesChef = await Chef.findRecipesChef(req.params.id);

      async function getImage(recipeId) {
        let results = await Recipe.getRecipeFiles(recipeId);

        results = results.map((image) => ({
          ...image,
          src: `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}`,
        }));

        return results[0];
      }

      const recipesPromise = recipesChef.map(async (recipe) => {
        recipe.file = await getImage(recipe.id);

        return recipe;
      });

      let recipesList = await Promise.all(recipesPromise);

      return res.render("admin/chefs/show", { chef, file, recipes: recipesList });
    } catch (error) {
      console.error(`Erro na exibição do chef! ${error}`);
    }
  },

  async edit(req, res) {
    try {
      const chef = await Chef.findOne({ where: { id: req.params.id } });

      let file = await Chef.getChefFile(chef.id);

      file = {
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`,
      };

      return res.render("admin/chefs/edit", { chef, file });
    } catch (error) {
      console.error(`Erro na renderização da edição do chef! ${error}`);
    }
  },

  async put(req, res) {
    try {
      let file_id;

      if (req.body.removed_files != "" && req.files[0] == undefined) {
        return res.send("Envie no mínimo 1 imagemm!");
      }

      if (req.files.length != 0) {
        file_id = await File.create({
          name: req.files[0].filename,
          path: req.files[0].path.replace(/\\/g, "/"),
        });
      }

      await Chef.update(req.body.id, {
        name: req.body.name,
        file_id: file_id || req.body.file_id,
      });

      if (req.body.removed_files) {
        let removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);

        const removedFilesPromise = removedFiles.map((id) => File.delete(id));
        await Promise.all(removedFilesPromise);
      }

      return res.redirect(`/admin/chefs/${req.body.id}`);
    } catch (error) {
      console.error(`Erro na atualização do chef! ${error}`);
    }
  },

  async delete(req, res) {
    try {
      const checkRecipe = await Recipe.checkRecipe(req.body.id);

      if (checkRecipe.length > 0) {
        return res.send("Chefs com receita cadastrada não podem ser deletados!");
      } else {
        let file = await Chef.getChefFile(req.body.id);

        await Chef.delete(req.body.id);

        unlinkSync(file.path);

        await File.delete(file.id);
      }

      return res.redirect("/admin/chefs");
    } catch (error) {
      console.error(`Erro na exclusão do chef! ${error}`);
    }
  },
};
