const express = require("express");
const routes = express.Router();

const multer = require("../app/middlewares/multer");
const recipes = require("../app/controllers/admin/recipes");
const chefs = require("../app/controllers/admin/chefs");
const useers = require("../app/controllers/users");

const users = require("./users");
routes.use("/admin/users", users);

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

/* === useers AREA === */
routes.get("/index", useers.index);
routes.get("/about", useers.about);
routes.get("/recipes/:id", useers.show);
routes.get("/recipes", useers.recipes);
routes.get("/chefs", useers.chefs);
routes.get("/results", useers.results);

module.exports = routes;
