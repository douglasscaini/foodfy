const Recipe = require("../models/Recipe");

function onlyUsers(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/admin/users/login");
  }

  next();
}

function isLoggedRedirectToProfile(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/admin/users/profile");
  }

  next();
}

function isAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.render(`parts/animations/access.njk`, {
      message: "Acesso negado! Você precisa ser um administrador!",
      url: `/admin/users/profile`,
      button: "Exibir Conta",
    });
  }

  next();
}

async function recipePermission(req, res, next) {
  const recipe = await Recipe.findOne({ where: { id: req.params.id } });

  if (req.session.userId != recipe.user_id && !req.session.isAdmin) {
    return res.render(`parts/animations/access.njk`, {
      message: "Acesso negado! Você consegue editar somente as suas receitas!",
      url: `/admin/recipes/user-recipes`,
      button: "Minhas Receitas",
    });
  }

  next();
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToProfile,
  isAdmin,
  recipePermission,
};
