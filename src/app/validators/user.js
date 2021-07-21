const User = require("../models/User");

async function post(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.render("user/create.njk", {
        user: req.body,
        error: "Usuário já cadastrado!",
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
}

async function edit(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.render("user/create.njk", {
        error: "Usuário não encontrado!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
  }
}

async function put(req, res, next) {
  try {
    const { id, email } = req.body;

    const user = await User.findOne({ where: { id } });

    if (email != user.email) {
      const checkRegisteredEmails = await User.findOne({ where: { email } });

      if (checkRegisteredEmails) {
        return res.render("user/edit.njk", {
          user: req.body,
          error: "Este email já está cadastrado!",
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  post,
  edit,
  put,
};
