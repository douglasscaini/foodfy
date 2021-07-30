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
};
