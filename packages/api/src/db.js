import { Pool } from 'pg';

const conString = process.env.DATABASE_URL || 'postgresql://greenhouse:password@localhost:5432/greenhouse';

const pool = new Pool({
  connectionString: conString
});

async function query(qs) {
  const client = await pool.connect();
  const results = await client.query(qs);
  client.release();
  return results.rows;
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

async function all(table) {
  return await query(`SELECT * FROM ${table}`);
}

function clear(table) {
  return query(`DELETE FROM ${table}`);
}

function create(table, params) {
  const assigns = Object.keys(params);
  const values = Object.values(params).map((value) => normalizeValue(value));
  return query(`INSERT INTO ${table} (${assigns}) VALUES (${values}) RETURNING *`);
}

function getById(table, id) {
  return query(`SELECT * FROM ${table} WHERE id=${id}`);
}

function update(table, id, params) {
  if (params.id) delete params.id;
  const assigns = Object.keys(params);
  const values = assigns.map((key) => `${key}=${normalizeValue(params[key])}`).join(', '); // eslint-disable-line
  return query(`UPDATE ${table} SET ${values} WHERE id=${id} RETURNING *`);
}

function deleteById(table, id) {
  return query(`DELETE FROM ${table} WHERE id = ${id}`);
}

export default {query, all, clear, create, deleteById, getById, update};
