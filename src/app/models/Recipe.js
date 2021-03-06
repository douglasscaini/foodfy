const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
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

  async create(data) {
    const query = `
                  INSERT INTO recipes
                  (chef_id, title, ingredients, preparation, information, created_at, updated_at)
                  VALUES ($1, $2, $3, $4, $5, $6, $7)
                  RETURNING id
                  `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      date(Date.now()).iso,
    ];

    let results = await db.query(query, values);

    return results.rows[0].id;
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

  update(data) {
    const query = `
                  UPDATE recipes
                  SET chef_id=($1), title=($2), ingredients=($3), preparation=($4), information=($5)
                  WHERE id = $6
                  `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];

    return db.query(query, values);
  },

  async delete(id) {
    const query = `
                  DELETE FROM recipes WHERE id = $1
                  `;

    return db.query(query, [id]);
  },

  async checkRecipe(id) {
    const query = `
                  SELECT recipes FROM recipes WHERE chef_id=$1
                  `;

    let results = await db.query(query, [id]);

    return results.rows;
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
