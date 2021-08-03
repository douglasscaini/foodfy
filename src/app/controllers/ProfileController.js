const User = require("../models/User");

module.exports = {
  index(req, res) {
    try {
      const { user } = req;

      res.render("admin/users/profile.njk", { user });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const { user } = req;

      const { name, email } = req.body;

      await User.update(user.id, { name, email });

      return res.render(`parts/animations/success.njk`, {
        message: "Sua conta foi atualizada com sucesso!",
        url: `/admin/users/profile`,
        button: "Exibir Conta",
      });
    } catch (error) {
      console.error(error);
    }
  },
};
