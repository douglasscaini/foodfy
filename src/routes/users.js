const express = require("express");
const routes = express.Router();

const UserValidator = require("../app/validators/user");
const SessionValidator = require("../app/validators/session");

const SessionController = require("../app/controllers/user/SessionController");
const UserController = require("../app/controllers/user/UserController");

const { onlyUsers, isLoggedRedirectToProfile } = require("../app/middlewares/session");

// LOGIN - LOGOUT
routes.get("/login", isLoggedRedirectToProfile, SessionController.loginForm);
routes.post("/login", SessionValidator.login, SessionController.login);
routes.post("/logout", SessionController.logout);

// FORGOT - RESET
routes.get("/forgot-password", SessionController.forgotForm);
routes.post("/forgot-password", SessionValidator.forgot, SessionController.forgot);
routes.get("/password-reset", SessionController.resetForm);
routes.post("/password-reset", SessionValidator.reset, SessionController.reset);

// ---------------------------------------------------------------------------------------------------------------

// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get("/", UserController.list);
routes.get("/create", onlyUsers, UserController.create);
routes.post("/", onlyUsers, UserValidator.post, UserController.post);
routes.get("/:id/edit", onlyUsers, UserValidator.edit, UserController.edit);
routes.put("/:id", onlyUsers, UserValidator.put, UserController.put);
// routes.delete('/admin/users/:id', UserController.delete) // Deletar um usuário

// ---------------------------------------------------------------------------------------------------------------

module.exports = routes;
