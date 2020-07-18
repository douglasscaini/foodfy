const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data/data')
const home = require('./data/home')
const about = require('./data/about')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    res.render('index', { home, recipes })
})

server.get('/about', (req, res) => {
    res.render('about', { about })
})

server.get('/recipes', (req, res) => {
    res.render('recipes', { recipes })
})

server.get("/recipes/:index", function (req, res) {
    const recipeIndex = req.params.index;
    const recipe = recipes[recipeIndex]

    return res.render('recipe', { recipe })
})

server.listen(5000, function () {
    console.log('server is running...')
})