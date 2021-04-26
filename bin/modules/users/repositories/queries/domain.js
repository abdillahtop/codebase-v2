const query = require('./query')
const { v4 } = require('uuid');
const dateFormat = require('dateformat')
const validate = require('validate.js')
const wrapper = require('../../../../helpers/utils/wrapper')
const model = require('./query_model')

class User {

  async getUsers(data) {
    const getUser = await query.getUser()
    if (getUser.err || validate.isEmpty(getUser.data)) {
      return wrapper.data('fail', [], 200);
    }

    const users = await getUser.data.map(value => {
      const userDetail = model.users();
      userDetail.userId = value.user_id
      userDetail.name = value.name
      userDetail.email = value.email
      return userDetail
    })

    return wrapper.data(users, 'Get detail user success', 200);

  }
}

module.exports = User