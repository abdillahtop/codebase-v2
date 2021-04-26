const MySQL = require('../../../../helpers/database/mysql/db');
const config = require('../../../../infra/configs/global_config');
const db = new MySQL(config.get('/mysqlConfig'));

const getUserByEmail = async (payload) => {
  const valueData = [payload.email];
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await db.findData(query, valueData);
  return result;
};

const getUser = async (payload) => {
  const valueData = [];
  const query = 'SELECT * FROM users';
  const result = await db.findData(query, valueData);
  return result;
};

module.exports = {
  getUser,
  getUserByEmail
};
