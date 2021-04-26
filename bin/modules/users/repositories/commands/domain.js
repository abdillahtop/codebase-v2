const command = require('./command')
const { v4 } = require('uuid');
const dateFormat = require('dateformat')
const validate = require('validate.js')
const wrapper = require('../../../../helpers/utils/wrapper')
const query = require('../queries/query')
const model = require('./command_model')
const crypto = require('crypto')
const jwt = require('../../../../auth/jwt_auth')
const moment = require('moment')

class Users {
  async registerUser(data) {
    const checkEmail = await query.getUserEmail(data)
    if (validate.isEmpty(checkEmail.data)) {
      const user = model.usersSave()
      user.userId = v4();
      user.name = data.name;
      user.email = data.email;
      user.password = await this.getSha(data.password, false)

      const saveUser = await command.saveUser(user)
      if (saveUser.err) {
        return wrapper.error('fail', 'Register user failed', 500);
      }
      delete user.password
      return wrapper.data(user, 'Register user success', 200);
    }
    return wrapper.error('fail', 'email has been taken', 409);
  }

  async updateUser(data) {
    const checkUser = await query.getUserByEmail(data);
    if (validate.isEmpty(checkUser.data)) {
      return wrapper.error('fail', 'User not found', 404);
    }

    const updateUser = await command.updateUser({ email: data.email, name: data.nama })
    if (updateUser.err) {
      return wrapper.error('fail', 'Update user failed', 500);
    }

    delete checkUser.data[0].password
    return wrapper.data(checkUser.data[0], 'Update user success', 200);
  }

  async deleteUser(data) {
    const checkUser = await query.getUserByEmail(data);
    if (validate.isEmpty(checkUser.data)) {
      return wrapper.error('fail', 'User not found', 404);
    }

    const deleteUser = await command.deleteUser({ userId: data.userId })
    if (deleteUser.err) {
      return wrapper.error('fail', 'Delete user failed', 500);
    }

    delete checkUser.data[0].password
    return wrapper.data('Success', 'Delete user success', 200);
  }

  async getSha(content, lowercase) {
    try {
      let md = crypto.createHash('SHA1');
      md.update(content);
      let myHash = md.digest('hex');
      return lowercase ? myHash.toLowerCase() : myHash;
    } catch (error) {
      console.log('error encrypt')
    }
    return content;
  }

}

module.exports = Users