const express = require("express");
const routes = express.Router();

const ChefController = require("../app/controllers/ChefController");

const { onlyUsers, isAdmin } = require("../app/middlewares/session");

const multer = require("../app/middlewares/multer");

routes.get("/", onlyUsers, ChefController.index);
routes.get("/create", onlyUsers, isAdmin, ChefController.create);
routes.get("/:id", onlyUsers, ChefController.show);
routes.get("/:id/edit", onlyUsers, isAdmin, ChefController.edit);
routes.post("/", onlyUsers, isAdmin, multer.array("chefs-photos", 6), ChefController.post);
routes.put("/", onlyUsers, isAdmin, multer.array("chefs-photos", 6), ChefController.put);
routes.delete("/", onlyUsers, isAdmin, ChefController.delete);

module.exports = routes;
