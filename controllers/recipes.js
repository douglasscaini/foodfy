const fs = require('fs')
const recipes = require('../data.json')

// INDEX
exports.index = (req, res) => {
    res.render('admin/index', { recipes: recipes.recipes })
}

// CREATE
exports.create = (req, res) => {
    res.render('admin/create')
}

// SHOW
exports.show = (req, res) => {
    const { id } = req.params

    const foundRecipe = recipes.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/show', { recipe })
}

// EDIT
exports.edit = (req, res) => {
    const { id } = req.params

    const foundRecipe = recipes.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/edit', { recipe })
}

// POST
exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, volte e preencha todos os campos!')
        }
    }

    let { image, title, author, ingredients, preparation, information } = req.body

    id = Number(recipes.recipes.length + 1)

    recipes.recipes.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information
    })

    fs.writeFile('data.json', JSON.stringify(recipes, null, 4), function (err) {
        if (err) return res.send('Erro de escrita no método POST!')

        return res.redirect('/admin/recipes')
    })
}

// PUT
exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundRecipe = recipes.recipes.find((recipe, foundIndex) => {
        if (recipe.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    recipes.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(recipes, null, 4), function (err) {
        if (err) return res.send('Erro de escrita no método PUT!')

        return res.redirect(`/admin/recipes/${id}`)
    })
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredRecipes = recipes.recipes.filter((recipe) => {
        return recipe.id != id
    })

    recipes.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(recipes, null, 4), function (err) {
        if (err) return res.send('Erro de escrita no método DELETE!')

        return res.redirect('/admin/recipes')
    })
}