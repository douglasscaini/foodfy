const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "recipes" });

module.exports = {
  ...Base,

  async findRecipesChef(chefId) {
    try {
      const query = `
                    SELECT recipes.* FROM recipes
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                    WHERE chefs.id = $1
                    ORDER BY updated_at DESC
                    `;

      const results = await db.query(query, [chefId]);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },

  async findRecipesUser(userId) {
    try {
      const query = `
                    SELECT recipes.* FROM recipes
                    LEFT JOIN users ON (recipes.user_id = users.id)
                    WHERE users.id = $1
                    ORDER BY updated_at DESC
                    `;

      const results = await db.query(query, [userId]);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },

  async results(filter) {
    try {
      const query = `
                    SELECT recipes.* FROM recipes
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                    WHERE recipes.title ILIKE '%${filter}%'
                    OR chefs.name ILIKE '%${filter}%'
                    ORDER BY recipes.updated_at DESC
                    `;

      const results = await db.query(query);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },
};
