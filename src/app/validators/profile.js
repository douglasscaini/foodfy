const User = require("../models/User");

const { compare } = require("bcryptjs");

async function index(req, res, next) {
  try {
    const { userId: id } = req.session;

    const user = await User.findOne({ where: { id } });

    if (!user)
      return res.render("session/login.njk", {
        error: "Usuário inexistente!",
      });

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}

async function put(req, res, next) {
  try {
    const { userId: id } = req.session;

    const { email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ where: { id } });

    if (email != user.email) {
      const checkRegisteredEmails = await User.findOne({ where: { email } });

      if (checkRegisteredEmails) {
        return res.render("user/profile.njk", {
          user: req.body,
          error: "Este email já está cadastrado!",
        });
      }
    }

    const passed = await compare(password, user.password);

    if (!passed) {
      return res.render("user/profile.njk", {
        user: req.body,
        error: "Senha incorreta!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  index,
  put,
};
