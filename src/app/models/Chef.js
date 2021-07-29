const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "chefs" });

module.exports = {
  ...Base,

  async findCountRecipes() {
    const query = `
                  SELECT chefs.*, count(recipes) AS total_recipes
                  FROM recipes
                  INNER JOIN chefs ON (recipes.chef_id = chefs.id)
                  GROUP BY chefs.id
                  ORDER BY created_at DESC
                  `;

    let results = await db.query(query);

    return results.rows;
  },

  async findRecipesChef(id) {
    const query = `
                  SELECT recipes.*, chefs.name as chef_name
                  FROM recipes
                  INNER JOIN chefs ON (recipes.chef_id = chefs.id)
                  WHERE chefs.id = $1
                  ORDER BY created_at DESC
                  `;

    let results = await db.query(query, [id]);

    return results.rows;
  },

  async findAll() {
    const query = `
                  SELECT chefs.*, files.path as file
                  FROM chefs
                  LEFT JOIN files ON (chefs.file_id = files.id)
                  ORDER BY created_at DESC
                  `;

    const results = await db.query(query);

    return results.rows;
  },

  async getChefFile(id) {
    const query = `
                  SELECT files.* FROM files LEFT JOIN chefs
                  ON (files.id = chefs.file_id)
                  WHERE chefs.id = $1
                  `;

    let results = await db.query(query, [id]);

    return results.rows[0];
  },
};
