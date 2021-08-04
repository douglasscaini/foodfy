const express = require("express");
const routes = express.Router();

const RecipeValidator = require("../app/validators/recipe");

const RecipeController = require("../app/controllers/RecipeController");

const { onlyUsers, recipePermission } = require("../app/middlewares/session");

const multer = require("../app/middlewares/multer");

routes.get("/user-recipes", onlyUsers, RecipeController.userRecipes);

routes.get("/", onlyUsers, RecipeController.index);
routes.get("/create", onlyUsers, RecipeController.create);
routes.get("/:id", onlyUsers, RecipeController.show);
routes.get("/:id/edit", onlyUsers, recipePermission, RecipeController.edit);
routes.post("/", onlyUsers, multer.array("photos", 5), RecipeValidator.post, RecipeController.post);
routes.put("/", onlyUsers, multer.array("photos", 5), RecipeValidator.put, RecipeController.put);
routes.delete("/", onlyUsers, RecipeController.delete);

module.exports = routes;
