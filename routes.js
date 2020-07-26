const express = require('express')
const routes = express.Router()

const recipes = require('./controllers/recipes')
const users = require('./controllers/users')

routes.get('/', (req, res) => {
    return res.redirect('/index')
})

// ADMIN
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

// USERS
routes.get('/index', users.index)
routes.get('/about', users.about)
routes.get('/recipes/:id', users.recipe)
routes.get('/recipes', users.recipes)

module.exports = routes