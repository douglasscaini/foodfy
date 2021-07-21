const express = require("express");
const routes = express.Router();

const MainController = require("../app/controllers/MainController");

routes.get("/index", MainController.index);
routes.get("/about", MainController.about);
routes.get("/recipes/:id", MainController.show);
routes.get("/recipes", MainController.recipes);
routes.get("/chefs", MainController.chefs);
routes.get("/results", MainController.results);

module.exports = routes;
