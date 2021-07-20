module.exports = {
  loginForm(req, res) {
    try {
      return res.render("session/login.njk");
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
