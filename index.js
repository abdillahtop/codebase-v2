const server = require('./bin/app/server')
const mongoConnection = require('./bin/helpers/database/mongodb/connection');
const port = process.env.PORT || 5000 // Default PORT

server.listen(port, () => {
  mongoConnection.init();
  console.log(`\n ${server.info.name} version ${server.info.version} started, listening at ${port} \n`)
})