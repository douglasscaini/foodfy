const db = require("../../config/db");

module.exports = {
  async delete(id) {
    return db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id]);
  },
};
