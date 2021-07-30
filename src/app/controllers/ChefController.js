const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

const LoadChefService = require("../services/loadChefService");

const { unlinkSync } = require("fs");

module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load("chefs", req.params.id);

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
      const { filename, path } = req.files[0];
      const fileId = await File.create({ name: filename, path: path.replace(/\\/g, "/") });

      const { name } = req.body;
      const chefId = await Chef.create({ file_id: fileId, name });

      return res.redirect(`/admin/chefs/${chefId}`);
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    try {
      const chef = await LoadChefService.load("chef", { where: { id: req.params.id } });

      return res.render("admin/chefs/show.njk", { chef });
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const chef = await LoadChefService.load("chef", { where: { id: req.params.id } });

      return res.render("admin/chefs/edit.njk", { chef });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      let fileId;

      if (req.files.length != 0) {
        const { filename, path } = req.files[0];
        fileId = await File.create({ name: filename, path: path.replace(/\\/g, "/") });
      }

      const { id, name } = req.body;
      await Chef.update(id, { name, file_id: fileId || req.body.file_id });

      if (req.body.removed_files) {
        let removedFileId = req.body.removed_files.replace(",", "");
        const file = await File.findOne({ where: { id: removedFileId } });

        unlinkSync(file.path);
        await File.delete(removedFileId);
      }

      return res.redirect(`/admin/chefs/${id}`);
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const { chef_id, file_id } = req.body;

      const recipesChef = await Recipe.findRecipesChef(chef_id);

      if (recipesChef.length > 0) {
        res.send("Chefes com receita cadastrada não podem ser deletados!");
      } else {
        await Chef.delete(chef_id);

        const file = await File.findOne({ where: { id: file_id } });

        unlinkSync(file.path);

        await File.delete(file_id);

        return res.redirect("/admin/chefs");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
