const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  async all() {
    const query = `
                  SELECT * FROM chefs
                  `;

    let results = await db.query(query);

    return results.rows;
  },

  create(chef) {
    const query = `
                  INSERT INTO chefs (file_id, name, created_at, updated_at)
                  VALUES ($1, $2, $3, $4)
                  RETURNING id
                  `;

    const values = [chef.file_id, chef.name, date(Date.now()).iso, date(Date.now()).iso];

    return db.query(query, values);
  },

  async find(id) {
    const query = `
                  SELECT * FROM chefs WHERE chefs.id = $1
                  `;

    let results = await db.query(query, [id]);

    return results.rows[0];
  },

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

  update(data) {
    const query = `
                  UPDATE chefs SET
                  name=($1), file_id=($2)
                  WHERE id = $3
                  `;

    const values = [data.name, data.file_id, data.id];

    return db.query(query, values);
  },

  delete(id) {
    const query = `
                  DELETE FROM chefs WHERE id = $1
                  `;

    return db.query(query, [id]);
  },

  async chefsSelectOptions() {
    const query = `
                  SELECT id, name FROM chefs
                  `;

    let results = await db.query(query);

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
};
