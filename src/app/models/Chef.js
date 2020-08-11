const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {

    const query = `
            SELECT * FROM chefs
        `

    db.query(query, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows)
    })

  },
  create(data, callback) {

    const query = `
            INSERT INTO chefs (name, avatar_url, created_at)
            VALUES ($1, $2, $3)
            RETURNING id
        `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })

  },
  find(id, callback) {

    const query = `
            SELECT * FROM chefs WHERE chefs.id = $1
        `

    db.query(query, [id], (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })

  },
  findCountRecipes(callback) {

    const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM recipes
            INNER JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
        `

    db.query(query, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows)
    })

  },
  findRecipesChef(id, callback) {

    const query = `
            SELECT recipes.*, chefs.name as chef_name
            FROM recipes
            INNER JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
        `

    db.query(query, [id], (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows)
    })

  },
  update(data, callback) {

    const query = `
            UPDATE chefs SET name=($1), avatar_url=($2)
            WHERE id = $3
        `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback()
    })

  },
  delete(id, callback) {

    const query = `
            DELETE FROM chefs WHERE id = $1
        `

    db.query(query, [id], (err, results) => {
      if (err) throw `Database error! ${err}`
      callback()
    })

  },
  chefsSelectOptions(callback) {

    const query = `
            SELECT id, name FROM chefs
        `

    db.query(query, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows)
    })

  }
}
