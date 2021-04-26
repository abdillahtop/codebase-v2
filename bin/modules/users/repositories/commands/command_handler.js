const Users = require('./domain');
const users = new Users();

const registerUser = async (data) => {
  const postData = async () => {
    const result = await users.registerUser(data);
    return result;
  };
  const response = await postData();
  return response;
};

const updateUser = async (data) => {
  const postData = async () => {
    const result = await users.updateUser(data);
    return result;
  };
  const response = await postData();
  return response;
};

const deleteUser = async (data) => {
  const postData = async () => {
    const result = await users.deleteUser(data);
    return result;
  };
  const response = await postData();
  return response;
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser
}