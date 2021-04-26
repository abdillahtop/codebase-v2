const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../utils/validator');
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');

const registerUser = async (req, res) => {
  const payload = req.body;
  const validateParam = await validator.isValidRegisterUser(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.registerUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result) :
      wrapper.response(res, 'success', result, 'Register success');
  };
  sendResponse(await postRequest(validateParam));
};

const updateUser = async (req, res) => {
  const payload = req.body;
  const validateParam = await validator.isValidUpdateUser(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result) :
      wrapper.response(res, 'success', result, 'Update success');
  };
  sendResponse(await postRequest(validateParam));
};

const deleteUser = async (req, res) => {
  const payload = req.params;
  const validateParam = await validator.isValidDeleteUser(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result) :
      wrapper.response(res, 'success', result, 'Delete success');
  };
  sendResponse(await postRequest(validateParam));
};

const getUsers = async (req, res) => {
  const postRequest = await queryHandler.getUsers(payload);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result) :
      wrapper.response(res, 'success', result, 'Register success');
  };
  sendResponse(await postRequest());
};
module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  getUsers
}