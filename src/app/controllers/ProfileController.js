const User = require("../models/User");

module.exports = {
  index(req, res) {
    try {
      const { user } = req;

      res.render("user/profile.njk", { user });
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const { user } = req;

      const { name, email } = req.body;

      await User.update(user.id, { name, email });

      return res.render("user/profile.njk", {
        user: req.body,
        success: "Sua conta foi atualizada com sucesso!",
      });
    } catch (error) {
      console.error(error);
    }
  },
};
