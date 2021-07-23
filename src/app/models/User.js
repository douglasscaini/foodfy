const db = require("../../config/db");

const Recipe = require("../models/Recipe");

const fs = require("fs");

const { date } = require("../../lib/utils");

module.exports = {
  async findAll() {
    try {
      const query = `
                    SELECT * FROM users ORDER BY updated_at DESC
                    `;

      const results = await db.query(query);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },

  async findOne(filters) {
    try {
      let query = `
                  SELECT * FROM users
                  `;

      Object.keys(filters).map((key) => {
        query = `
                ${query} ${key}
                `;

        Object.keys(filters[key]).map((field) => {
          query = `
                  ${query} ${field} = '${filters[key][field]}'
                  `;
        });
      });

      const results = await db.query(query);

      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  async create({ name, email, password, is_admin }) {
    try {
      const query = `
                  INSERT INTO users
                  (name, email, password, is_admin, created_at, updated_at)
                  VALUES ($1, $2, $3, $4, $5, $6)
                  RETURNING id
                  `;

      const values = [name, email, password, is_admin, date(Date.now()).iso, date(Date.now()).iso];

      let results = await db.query(query, values);

      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },

  async update(id, fields) {
    try {
      let query = `
                  UPDATE users SET
                  `;

      Object.keys(fields).map((key, index, array) => {
        if (index + 1 < array.length) {
          query = `
                  ${query} ${key} = '${fields[key]}',
                  `;
        } else {
          query = `
                  ${query} ${key} = '${fields[key]}' WHERE id = ${id}
                  `;
        }
      });

      await db.query(query);

      return;
    } catch (error) {
      console.error(error);
    }
  },

  async delete(id) {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};
