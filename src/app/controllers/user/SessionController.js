const User = require("../../models/User");

const crypto = require("crypto");
const { hash } = require("bcryptjs");

const mailer = require("../../../lib/mailer");

module.exports = {
  loginForm(req, res) {
    try {
      return res.render("session/login.njk");
    } catch (error) {
      console.error(error);
    }
  },

  login(req, res) {
    try {
      req.session.userId = req.user.id;

      return res.redirect("/admin/users/profile");
    } catch (error) {
      console.error(error);
    }
  },

  forgotForm(req, res) {
    try {
      return res.render("session/forgot-password.njk");
    } catch (error) {
      console.error(error);
    }
  },

  async forgot(req, res) {
    try {
      const user = req.user;

      const token = crypto.randomBytes(20).toString("hex");

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: "no-replay@foodfy.com.br",
        subject: "Foodfy - Recuperação de Senha!",
        html: `
              <h2>Perdeu a chave?</h2>

              <p>Não se preocupe, clique no link abaixo para recuperar sua senha:</p>

              <p>
                <a href="http://localhost:3000/admin/users/password-reset?token=${token}" target="_blank">Recuperar senha...</a>
              </p>
        `,
      });

      return res.render("session/forgot-password", {
        success: "Sucesso! Verifique seu e-mail!",
      });
    } catch (error) {
      console.error(error);
    }
  },

  resetForm(req, res) {
    try {
      return res.render("session/password-reset.njk", { token: req.query.token });
    } catch (error) {
      console.error(error);
    }
  },

  async reset(req, res) {
    try {
      const { user } = req;
      const { password } = req.body;

      const newPassword = await hash(password, 8);

      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });

      return res.render("session/login.njk", {
        user: req.body,
        success: "Senha atualizada! Realize o login!",
      });
    } catch (error) {
      console.error(error);
    }
  },

  logout(req, res) {
    try {
      req.session.destroy();

      return res.redirect("/");
    } catch (error) {
      console.error(error);
    }
  },
};
