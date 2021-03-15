const express = require("express");
const routes = express.Router();

const multer = require("./app/middlewares/multer");
const recipes = require("./app/controllers/admin/recipes");
const chefs = require("./app/controllers/admin/chefs");
const users = require("./app/controllers/users");

routes.get("/", (req, res) => {
  return res.redirect("/index");
});

/* === ADMIN AREA === */
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.post("/admin/recipes", multer.array("recipes-photos", 6), recipes.post);
routes.put("/admin/recipes", multer.array("recipes-photos", 6), recipes.put);
routes.delete("/admin/recipes", recipes.delete);

routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.post("/admin/chefs", multer.array("chefs-photos", 6), chefs.post);
routes.put("/admin/chefs", multer.array("chefs-photos", 6), chefs.put);
routes.delete("/admin/chefs", chefs.delete);

/* === USERS AREA === */
routes.get("/index", users.index);
routes.get("/about", users.about);
routes.get("/recipes/:id", users.show);
routes.get("/recipes", users.recipes);
routes.get("/chefs", users.chefs);
routes.get("/results", users.results);

module.exports = routes;
