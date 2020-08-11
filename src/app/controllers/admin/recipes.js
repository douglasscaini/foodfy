const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')

module.exports = {
  index(req, res) {

    Recipe.all((recipes) => {
      return res.render('admin/recipes/index', { recipes })
    })

  },
  create(req, res) {

    Chef.chefsSelectOptions((chefsOptions) => {
      return res.render('admin/recipes/create', { chefsOptions })
    })

  },
  post(req, res) {

    Recipe.create(req.body, () => {
      return res.redirect(`/admin/recipes`)
    })

  },
  show(req, res) {

    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send('Receita não encontrado!')

      return res.render('admin/recipes/show', { recipe })
    })

  },
  edit(req, res) {

    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.send('Receita não encontrado!')

      Chef.chefsSelectOptions((chefsOptions) => {
        return res.render('admin/recipes/edit', { recipe, chefsOptions })
      })
    })

  },
  put(req, res) {

    Recipe.update(req.body, () => {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })

  },
  delete(req, res) {

    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })

  }
}