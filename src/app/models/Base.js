const db = require("../../config/db");

function find(filters, table) {
  let query = `
              SELECT * FROM ${table}
              `;

  if (filters) {
    Object.keys(filters).map((key) => {
      query += ` ${key}`;

      Object.keys(filters[key]).map((field) => {
        query += ` ${field} = '${filters[key][field]}'`;
      });
    });
  } else {
    query += `ORDER BY updated_at DESC`;
  }

  return db.query(query);
}

const Base = {
  init({ table }) {
    try {
      if (!table) throw new Error("Parâmetro inválido!");

      this.table = table;

      return this;
    } catch (error) {
      console.error(error);
    }
  },

  async findOne(filters) {
    try {
      const results = await find(filters, this.table);

      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  async findAll(filters) {
    try {
      const results = await find(filters, this.table);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },

  async create(fields) {
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);

        Array.isArray(fields[key])
          ? values.push(`'{"${fields[key].join('","')}"}'`)
          : values.push(`'${fields[key]}'`);
      });

      const query = `
                    INSERT INTO ${this.table}
                    (${keys.join(",")})
                    VALUES (${values.join(",")})
                    RETURNING id
                    `;

      const results = await db.query(query);

      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },

  update(id, fields) {
    try {
      let update = [];

      Object.keys(fields).map((key) => {
        let line;

        Array.isArray(fields[key])
          ? (line = `${key} = '{"${fields[key].join('","')}"}'`)
          : (line = `${key} = '${fields[key]}'`);

        update.push(line);
      });

      let query = `
                  UPDATE ${this.table} SET
                  ${update.join(",")}
                  WHERE id = ${id}
                  `;

      return db.query(query);
    } catch (error) {
      console.error(error);
    }
  },

  delete(id) {
    try {
      return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },

  async paginate({ limit, offset }) {
    try {
      const query = `
                    SELECT ${this.table}.*,
                    (SELECT count(*) FROM ${this.table}) AS total
                    FROM ${this.table}
                    ORDER BY updated_at DESC
                    LIMIT ${limit} OFFSET ${offset}
                    `;

      const results = await db.query(query);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = Base;
