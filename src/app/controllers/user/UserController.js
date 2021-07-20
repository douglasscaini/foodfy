const User = require("../../models/User");

module.exports = {
  async create(req, res) {
    try {
      return res.render("user/create.njk");
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      let { name, email, is_admin } = req.body;

      is_admin = is_admin || false;

      let password = "123";

      const userId = await User.create({ name, email, password, is_admin });

      req.session.userId = userId;

      return res.redirect(`/admin/users/${userId}/edit`);
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const { user } = req;

      return res.render("user/edit.njk", { user });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      let { id, name, email, is_admin } = req.body;

      is_admin = is_admin || false;

      await User.update(id, { name, email, is_admin });

      return res.render("user/edit.njk", {
        user: req.body,
        success: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      console.error(error);
    }
  },

  list(req, res) {
    return res.send("lista");
  },
};
