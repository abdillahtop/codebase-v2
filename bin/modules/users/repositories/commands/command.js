const MySQL = require('../../../../helpers/database/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new MySQL(config.get('/mysqlConfig'));

const saveUser = async (payload) => {
  const valueData = [payload.userId, payload.email, payload.name, payload.password];
  const query = `INSERT INTO users (user_id, email, name, password) VALUES (?,?,?,?)`;
  const result = await db.insertOne(query, valueData);
  return result;
};

const updateUser = async (payload) => {
  const valueData = [payload.name, payload.email];
  const query = 'UPDATE users SET name = ? where email = ?';
  const result = await db.insertOne(query, valueData);
  return result;
};

const deleteUser = async (payload) => {
  const valueData = [payload.userId];
  const query = 'DELETE users where user_id = ?';
  const result = await db.insertOne(query, valueData);
  return result;
};

module.exports = {
  saveUser,
  updateUser,
  deleteUser
};
