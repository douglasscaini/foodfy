const express = require("express");
const routes = express.Router();

const RecipeController = require("../app/controllers/RecipeController");

const multer = require("../app/middlewares/multer");

routes.get("/", RecipeController.index);
routes.get("/create", RecipeController.create);
routes.get("/:id", RecipeController.show);
routes.get("/:id/edit", RecipeController.edit);
routes.post("/", multer.array("recipes-photos", 6), RecipeController.post);
routes.put("/", multer.array("recipes-photos", 6), RecipeController.put);
routes.delete("/", RecipeController.delete);

module.exports = routes;
