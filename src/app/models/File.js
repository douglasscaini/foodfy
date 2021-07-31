const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "files" });

module.exports = {
  ...Base,

  async findFilesRecipe(recipeId) {
    try {
      const query = `
                  SELECT files.* FROM files
                  LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                  WHERE recipe_files.recipe_id = $1
                  `;

      const results = await db.query(query, [recipeId]);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },
};
