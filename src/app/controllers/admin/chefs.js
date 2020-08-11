const Chef = require('../../models/Chef')
const Recipe = require('../../models/Recipe')

module.exports = {
  index(req, res) {

    Chef.all((chefs) => {
      return res.render('admin/chefs/index', { chefs })
    })

  },
  create(req, res) {

    return res.render('admin/chefs/create')

  },
  post(req, res) {

    Chef.create(req.body, () => {
      return res.redirect(`/admin/chefs`)
    })

  },
  show(req, res) {

    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.send('Chef não encontrado!')

      Chef.findRecipesChef(req.params.id, (recipes) => {
        return res.render('admin/chefs/show', { chef, recipes })
      })
    })

  },
  edit(req, res) {

    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.send('Chef não encontrado!')

      return res.render('admin/chefs/edit', { chef })
    })

  },
  put(req, res) {

    Chef.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })

  },
  delete(req, res) {

    Recipe.checkRecipe(req.body.id, (recipes) => {
      if (recipes.length > 0) {
        return res.send('Chefs com receita cadastrada não podem ser deletados!')
      } else {
        Chef.delete(req.body.id, () => {
          return res.redirect('/admin/chefs')
        })
      }
    })

  }
}