require('dotenv').config()

const project = require('../../package.json');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const basicAuth = require('../auth/basic_auth')
const jwt = require('../auth/jwt_auth')
const logger = require('morgan')

// Routing
const userHandler = require('../modules/users/handlers/api_handler')


app.info = {
  name: `${project.name}-server`,
  version: project.version
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('Server connected..')
})

//user
app.post('/api/v1/users/register', basicAuth.isAuthenticated, userHandler.registerUser)
app.patch('/api/v1/users/update', basicAuth.isAuthenticated, userHandler.updateUser)
app.post('/api/v1/users/delete/:userId', basicAuth.isAuthenticated, userHandler.deleteUser)
app.post('/api/v1/users/all', basicAuth.isAuthenticated, userHandler.getUsers)

module.exports = app;