const express = require("express");
const routes = express.Router();

const ChefController = require("../app/controllers/ChefController");

const multer = require("../app/middlewares/multer");

routes.get("/", ChefController.index);
routes.get("/create", ChefController.create);
routes.get("/:id", ChefController.show);
routes.get("/:id/edit", ChefController.edit);
routes.post("/", multer.array("chefs-photos", 6), ChefController.post);
routes.put("/", multer.array("chefs-photos", 6), ChefController.put);
routes.delete("/", ChefController.delete);

module.exports = routes;
