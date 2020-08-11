const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {

    const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            INNER JOIN chefs
            ON recipes.chef_id = chefs.id
        `

    db.query(query, (err, results) => {
      if (err) throw `Database error ${err}`
      callback(results.rows)
    })

  },
  create(data, callback) {

    const query = `
            INSERT INTO recipes (chef_id, image, title, ingredients, preparation, information, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })

  },
  find(id, callback) {

    const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            INNER JOIN chefs
            ON recipes.chef_id = chefs.id
            WHERE recipes.id = $1
        `

    db.query(query, [id], (err, results) => {
      if (err) throw `Database error! ${err}`
      callback(results.rows[0])
    })

  },
  update(data, callback) {

    const query = `
            UPDATE recipes SET chef_id=($1), image=($2), title=($3), ingredients=($4), preparation=($5), information=($6)
            WHERE id = $7
        `

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`
      callback()
    })

  },
  delete(id, callback) {

    const query = `
            DELETE FROM recipes WHERE id = $1
        `

    db.query(query, [id], (err, results) => {
      if (err) throw `Database error! ${err}`
      callback()
    })

  },
  checkRecipe(id, callback) {

    const query = `
      SELECT recipes FROM recipes WHERE chef_id=$1
    `
    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      return callback(results.rows)
    })

  },
  results(filter, callback) {

    const query = `
        SELECT recipes.id, recipes.image, recipes.title, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs
        ON chefs.id = recipes.chef_id
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'
        `

    db.query(query, (err, results) => {
      if (err) throw `Database error! ${err}`
      return callback(results.rows)
    })

  },
  paginate(params) {

    const { limit, offset, callback } = params

    let query = "",
      totalQuery = `(
          SELECT count(*) FROM recipes
        ) AS total
        `

    totalQuery = `(
          SELECT count(*) FROM recipes
      ) AS total`

    query = `
      SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
      FROM recipes
      INNER JOIN chefs
      ON recipes.chef_id = chefs.id
      LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })

  }
}