const express = require("express");
const routes = express.Router();

const UserValidator = require("../app/validators/user");
const SessionValidator = require("../app/validators/session");
const ProfileValidator = require("../app/validators/profile");

const SessionController = require("../app/controllers/SessionController");
const UserController = require("../app/controllers/UserController");
const ProfileController = require("../app/controllers/ProfileController");

const { onlyUsers, isLoggedRedirectToProfile, isAdmin } = require("../app/middlewares/session");

// LOGIN - LOGOUT
routes.get("/login", isLoggedRedirectToProfile, SessionController.loginForm);
routes.post("/login", SessionValidator.login, SessionController.login);
routes.post("/logout", SessionController.logout);

// FORGOT - RESET
routes.get("/forgot-password", SessionController.forgotForm);
routes.get("/password-reset", SessionController.resetForm);
routes.post("/forgot-password", SessionValidator.forgot, SessionController.forgot);
routes.post("/password-reset", SessionValidator.reset, SessionController.reset);

// USER PROFILE
routes.get("/profile", onlyUsers, ProfileValidator.index, ProfileController.index);
routes.put("/profile", onlyUsers, ProfileValidator.put, ProfileController.put);

// ADMIN USER REGISTER
routes.get("/create", onlyUsers, isAdmin, UserController.create);
routes.post("/", onlyUsers, isAdmin, UserValidator.post, UserController.post);

// ADMIN USER CONTROLLER
routes.get("/", onlyUsers, isAdmin, UserController.list);
routes.get("/:id/edit", onlyUsers, isAdmin, UserValidator.edit, UserController.edit);
routes.put("/:id", onlyUsers, isAdmin, UserValidator.put, UserController.put);
// routes.delete('/admin/users/:id', onlyUsers, isAdmin, UserController.delete)
module.exports = routes;
