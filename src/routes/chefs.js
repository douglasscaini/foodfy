const express = require("express");
const routes = express.Router();

const ChefValidator = require("../app/validators/chef");

const ChefController = require("../app/controllers/ChefController");

const { onlyUsers, isAdmin } = require("../app/middlewares/session");

const multer = require("../app/middlewares/multer");

routes.get("/", onlyUsers, ChefController.index);
routes.get("/create", onlyUsers, isAdmin, ChefController.create);
routes.get("/:id", onlyUsers, ChefController.show);
routes.get("/:id/edit", onlyUsers, isAdmin, ChefController.edit);
routes.post("/", onlyUsers, isAdmin, multer.array("photos", 1), ChefValidator.post, ChefController.post);
routes.put("/", onlyUsers, isAdmin, multer.array("photos", 1), ChefValidator.put, ChefController.put);
routes.delete("/", onlyUsers, isAdmin, ChefController.delete);

module.exports = routes;
