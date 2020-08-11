const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {

    Recipe.all((recipes) => {
      return res.render('users/index', { recipes: recipes.slice(0, 6) })
    })

  },
  about(req, res) {

    res.render('users/about')

  },
  recipes(req, res) {
    let { page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
      page,
      limit,
      offset,
      callback(recipes) {

        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }

        return res.render('users/recipes', { recipes, pagination })
      }
    }

    Recipe.paginate(params)

  },
  show(req, res) {

    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send('Receita não encontrada!')

      return res.render('users/show', { recipe })
    })

  },
  chefs(req, res) {

    Chef.findCountRecipes((chefs) => {
      return res.render('users/chefs', { chefs })
    })

  },
  results(req, res) {

    Recipe.results(req.query.filter, (recipes) => {
      const filter = req.query.filter
      return res.render('users/results', { recipes, filter })
    })

  }
}