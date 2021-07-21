const express = require("express");
const routes = express.Router();

const main = require("./main");
const chefs = require("./chefs");
const recipes = require("./recipes");
const users = require("./users");

routes.use(main);
routes.use("/admin/chefs", chefs);
routes.use("/admin/recipes", recipes);
routes.use("/admin/users", users);

routes.get("/", (req, res) => {
  return res.redirect("/index");
});

module.exports = routes;
