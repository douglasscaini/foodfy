const Recipe = require("../models/Recipe");

const LoadChefService = require("../services/LoadChefService");

async function post(req, res, next) {
  try {
    if (req.files.length === 0) {
      return res.render("admin/chefs/create.njk", {
        chef: req.body,
        error: "Por favor, envie 1 foto!",
      });
    }

    if (req.files.length > 1) {
      return res.render("admin/chefs/create.njk", {
        chef: req.body,
        error: "Somente 1 foto é permitida!",
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
}

async function put(req, res, next) {
  try {
    if (req.body.removed_files != "" && req.files[0] == undefined) {
      return res.render("admin/chefs/edit.njk", {
        chef: req.body,
        error: "Por favor, envie 1 foto!",
      });
    }

    if (req.files.length > 1) {
      return res.render("admin/chefs/edit.njk", {
        chef: req.body,
        error: "Somente 1 foto é permitida!",
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
