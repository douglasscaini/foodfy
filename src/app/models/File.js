const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "files" });

module.exports = {
  ...Base,

  createRecipeFiles({ recipe_id, file_id }) {
    const query = `
                  INSERT INTO recipe_files(recipe_id, file_id)
                  VALUES($1, $2)
                  RETURNING id
                  `;

    const values = [recipe_id, file_id];

    return db.query(query, values);
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

  async getChefFiles(id) {
    const query = `
                  SELECT files.* FROM files LEFT JOIN chefs
                  ON (files.id = chefs.file_id)
                  WHERE chefs.id = $1
                  `;

    let results = await db.query(query, [id]);

    return results.rows;
  },
};
