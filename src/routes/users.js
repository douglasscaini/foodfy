const express = require("express");
const routes = express.Router();

const UserValidator = require("../app/validators/user");

const SessionController = require("../app/controllers/user/SessionController");
const UserController = require("../app/controllers/user/UserController");

routes.get("/login", SessionController.loginForm);
// routes.post("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

// routes.get("/forgot-password", SessionController.forgotForm);
// routes.get("/password-reset", SessionController.resetForm);
// routes.post("/forgot-password", SessionController.forgot);
// routes.post("/password-reset", SessionController.reset);

// routes.get("/", UserController.show);
// routes.put("/", UserController.update);
// routes.delete("/", UserController.delete);

// ---------------------------------------------------------------------------------------------------------------

// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get("/", UserController.list);
routes.get("/create", UserController.create);
routes.post("/", UserValidator.post, UserController.post);
routes.get("/:id/edit", UserValidator.edit, UserController.edit);
routes.put("/:id", UserValidator.put, UserController.put);
// routes.delete('/admin/users/:id', UserController.delete) // Deletar um usuário

// ---------------------------------------------------------------------------------------------------------------

module.exports = routes;
