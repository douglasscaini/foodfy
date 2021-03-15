const db = require("../../config/db");
const fs = require("fs");

module.exports = {
  async create(file) {
    const query = `
                  INSERT INTO files (name, path)
                  VALUES ($1, $2)
                  RETURNING id
                  `;

    const values = [file.name, file.path];

    let results = await db.query(query, values);

    return results.rows[0].id;
  },

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

  async delete(id) {
    const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);

    const file = result.rows[0];

    fs.unlinkSync(file.path);

    return db.query(`DELETE FROM files WHERE id = $1`, [id]);
  },
};
