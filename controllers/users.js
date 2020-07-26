const recipes = require('../data.json')

// INDEX
exports.index = (req, res) => {
    res.render('users/index', { recipes: recipes.recipes })
}

// ABOUT
exports.about = (req, res) => {
    res.render('users/about')
}

// RECIPES
exports.recipes = (req, res) => {
    res.render('users/recipes', { recipes: recipes.recipes })
}

// RECIPE
exports.recipe = (req, res) => {
    const { id } = req.params

    const foundRecipe = recipes.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        ...foundRecipe
    }

    return res.render('users/recipe', { recipe })
}