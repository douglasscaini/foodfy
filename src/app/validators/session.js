const User = require("../models/User");

const { compare } = require("bcryptjs");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("session/login.njk", {
        user: req.body,
        error: "Usuário não cadastrado!",
      });
    }

    const passed = await compare(password, user.password);

    if (!passed) {
      return res.render("session/login.njk", {
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

async function forgot(req, res, next) {
  try {
    const { email } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("session/forgot-password.njk", {
        user: req.body,
        error: "E-mail não cadastrado!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}

async function reset(req, res, next) {
  try {
    const { email, password, passwordRepeat, token } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("session/password-reset.njk", {
        user: req.body,
        token,
        error: "Usuário não cadastrado!",
      });
    }

    if (password != passwordRepeat) {
      return res.render("session/password-reset.njk", {
        user: req.body,
        token,
        error: "As senhas não coincidem!",
      });
    }

    if (token != user.reset_token) {
      return res.render("session/password-reset.njk", {
        user: req.body,
        token,
        error: "Token inválido! Solicite novamente!",
      });
    }

    let now = new Date();
    now = now.setHours(now.getHours());

    if (now > user.reset_token_expires) {
      return res.render("session/password-reset.njk", {
        user: req.body,
        token,
        error: "Token expirou! Solicite novamente!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  login,
  forgot,
  reset,
};
