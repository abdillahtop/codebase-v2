const nodemailer = require('nodemailer')
const wrapper = require('../../helpers/utils/wrapper')
const config = require('../../infra/configs/global_config')
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: config.get('/authEmail')
})

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err
      callback(err)
    } else {
      callback(null, html)
    }
  })
}

const sendActivation = async (data) => {
  readHTMLFile(__dirname + '/format-mail/index.html', function (err, html) {
    const template = handlebars.compile(html)
    const replacements = {
      username: data.name
    }
    const htmlToSend = template(replacements)
    const mailOptions = {
      from: config.get('/authEmail/user'),
      to: data.email,
      subject: 'Activation Account',
      html: htmlToSend
    }
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        return wrapper.error(error)
      } else {
        return wrapper.data(response)
      }
    })
  })
}

const sendForget = async (data) => {
  readHTMLFile(__dirname + '/format-mail/forget.html', function (err, html) {
    const template = handlebars.compile(html)
    const replacements = {
      name: data.name,
      code: data.code
    }
    const htmlToSend = template(replacements)
    const mailOptions = {
      from: config.get('/authEmail/user'),
      to: data.email,
      subject: 'Forgot Password',
      html: htmlToSend
    }
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        return wrapper.error(error.response)
      } else {
        return wrapper.data(response)
      }
    })
  })
}

module.exports =  {
  sendActivation,
  sendForget
}
