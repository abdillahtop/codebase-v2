const Users = require('./domain');
const users = new Users();

const getUsers = async (data) => {
  const postData = async () => {
    const result = await users.getUsers(data);
    return result;
  };
  const response = await postData();
  return response;
};


module.exports = {
  getUsers
}