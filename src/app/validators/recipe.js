const Chef = require("../models/Chef");
const File = require("../models/File");

async function post(req, res, next) {
  try {
    const chefs = await Chef.findAll();

    if (req.files.length === 0) {
      return res.render("admin/recipes/create.njk", {
        recipe: req.body,
        chefs,
        error: "Por favor, envie 1 foto!",
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
}

async function put(req, res, next) {
  try {
    const files = await File.findFilesRecipe(req.body.id);

    const removedFiles = req.body.removed_files.split(",");
    const lastIndex = removedFiles.length - 1;
    removedFiles.splice(lastIndex, 1);

    const chefs = await Chef.findAll();

    if (req.files && req.files.length === 0 && removedFiles.length == files.length) {
      return res.render(`admin/recipes/edit.njk`, {
        recipe: req.body,
        chefs,
        error: "Por favor, envie 1 foto!",
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  post,
  put,
};
