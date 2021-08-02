const User = require("../models/User");
const Recipe = require("../models/Recipe");
const File = require("../models/File");
const FileRecipe = require("../models/FileRecipe");

const crypto = require("crypto");
const { hash } = require("bcryptjs");
const { unlinkSync } = require("fs");

const mailer = require("../../lib/mailer");

module.exports = {
  async create(req, res) {
    try {
      return res.render("admin/users/create.njk");
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      let { name, email, is_admin } = req.body;

      is_admin = is_admin || false;

      const tokenPassword = crypto.randomBytes(8).toString("hex");

      await mailer.sendMail({
        to: email,
        from: "no-replay@foodfy.com.br",
        subject: "Foodfy - Cadastro Efetuado!",
        html: `
          <h2>Bem-vindo ao Foodfy</h2>

          <p>Agora você tem acesso a milhares de receitas!</p>

          </br>

          <p>Abaixo estão seus dados para o acesso:</p>

          <p><strong>E-mail:</strong> ${email}</p>

          <p><strong>Senha:</strong> ${tokenPassword}</p>

          </br>

          <p>Para entrar agora, clique no link abaixo:</p>

          <p>
            <a href="http:localhost:3000/admin/users/login" target="_blank">Fazer Login no Foodfy...</a>
          </p>
        `,
      });

      const password = await hash(tokenPassword, 8);

      const userId = await User.create({ name, email, password, is_admin });

      return res.render(`parts/animations/success.njk`, {
        message: "Usuário cadastrado com sucesso!",
        url: `/admin/users/${userId}/edit`,
        button: "Exibir Usuário",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const { user } = req;

      return res.render("admin/users/edit.njk", { user });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      let { id, name, email, is_admin } = req.body;

      is_admin = is_admin || false;

      await User.update(id, { name, email, is_admin });

      return res.render(`parts/animations/success.njk`, {
        message: "Usuário atualizado com sucesso!",
        url: `/admin/users`,
        button: "Exibir Usuários",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const { id: user_id } = req.body;

      const recipesUser = await Recipe.findRecipesUser(user_id);

      if (recipesUser.length > 0) {
        recipesUser.map(async (recipe) => {
          let recipesFile = await File.findFilesRecipe(recipe.id);

          recipesFile.map(async (file) => {
            const fileRecipe = await FileRecipe.findOne({ where: { file_id: file.id } });
            await FileRecipe.delete(fileRecipe.id);

            unlinkSync(file.path);
            await File.delete(file.id);
          });

          await Recipe.delete(recipe.id);
        });
      }

      await User.delete(user_id);

      return res.render(`parts/animations/delete.njk`, {
        message: "Usuário deletado com sucesso!",
        url: `/admin/users`,
        button: "Exibir Usuários",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async list(req, res) {
    try {
      const users = await User.findAll();

      res.render("admin/users/list.njk", { users });
    } catch (error) {
      console.error(error);
    }
  },
};
