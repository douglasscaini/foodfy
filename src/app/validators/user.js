const User = require("../models/User");

async function post(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.render("admin/users/create.njk", {
        user: req.body,
        error: "Este email já está cadastrado!",
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
      return res.render("admin/users/create.njk", {
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
        return res.render("admin/users/edit.njk", {
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

async function deleteAccount(req, res, next) {
  try {
    const { userId } = req.session;
    const { id } = req.body;

    const user = await User.findOne({ where: { id } });

    if (userId == id) {
      return res.render("admin/users/profile", {
        user,
        error: "Você não pode deletar a sua própria conta!",
      });
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
  deleteAccount,
};
