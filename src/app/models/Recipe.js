const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "recipes" });

module.exports = {
  ...Base,

  // OK
  async findRecipesChef(chefId) {
    const query = `
                  SELECT recipes.* FROM recipes
                  LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                  WHERE chefs.id = $1
                  ORDER BY updated_at DESC
                  `;

    let results = await db.query(query, [chefId]);

    return results.rows;
  },

  async all() {
    const query = `
                  SELECT recipes.*, chefs.name AS chef_name
                  FROM recipes
                  INNER JOIN chefs
                  ON recipes.chef_id = chefs.id
                  ORDER BY created_at DESC
                  `;

    let results = await db.query(query);

    return results.rows;
  },

  async find(id) {
    const query = `
                  SELECT recipes.*, chefs.name AS chef_name
                  FROM recipes
                  INNER JOIN chefs
                  ON recipes.chef_id = chefs.id
                  WHERE recipes.id = $1
                 `;

    let results = await db.query(query, [id]);

    return results.rows[0];
  },

  async getRecipeFiles(id) {
    const query = `
                  SELECT files.*, recipe_files.file_id AS file_id
                  FROM files 
                  LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                  WHERE recipe_files.recipe_id = $1
                  `;

    let results = await db.query(query, [id]);

    return results.rows;
  },

  async results(filter) {
    const query = `
                  SELECT recipes.id, recipes.title, chefs.name AS chef_name
                  FROM recipes
                  LEFT JOIN chefs
                  ON chefs.id = recipes.chef_id
                  WHERE recipes.title ILIKE '%${filter}%'
                  OR chefs.name ILIKE '%${filter}%'
                  ORDER BY recipes.updated_at DESC
                  `;

    let results = await db.query(query);

    return results.rows;
  },

  paginate(params) {
    const { limit, offset, callback } = params;

    let query = "",
      totalQuery = `(
                    SELECT count(*) FROM recipes
                    ) AS total
                    `;

    totalQuery = `(
                  SELECT count(*) FROM recipes
                  ) AS total`;

    query = `
            SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
            FROM recipes
            INNER JOIN chefs
            ON recipes.chef_id = chefs.id
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2
            `;

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
};
