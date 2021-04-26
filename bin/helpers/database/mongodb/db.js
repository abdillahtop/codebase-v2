const validate = require('validate.js');
const mongoConnection = require('./connection');
const wrapper = require('../../utils/wrapper');

class DB {
  constructor(config) {
    this.config = config;
  }

  setCollection(collectionName) {
    this.collectionName = collectionName;
  }

  async getDatabase() {
    const config = this.config.replace('//', '');
    const splitDbName = config.split('/');
    const dbName = splitDbName[1].split('?');
    return dbName[0];
  }

  async findOne(parameter) {
    const ctx = 'mongodb-findOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.findOne(parameter);
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found', 'Please Try Another Input', 404);
      }
      return wrapper.data(recordset);

    } catch (err) {
      return wrapper.error(`Error Find One Mongo ${err.message}`, `${err.message}`, 409);
    }

  }

  async findMany(parameter) {
    const ctx = 'mongodb-findMany';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.find(parameter).toArray();
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found', 'Please Try Another Input', 404);
      }
      return wrapper.data(recordset);

    } catch (err) {
      return wrapper.error(`Error Find Many Mongo ${err.message}`, `${err.message}`, 409);
    }

  }

  async insertOne(document) {
    const ctx = 'mongodb-insertOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.insertOne(document);
      if (recordset.result.n !== 1) {
        return wrapper.error('Internal Server Error', 'Failed Inserting Data to Database', 500);
      }
      return wrapper.data(document, 'created', 201);

    } catch (err) {
      return wrapper.error(`Error Insert One Mongo ${err.message}`, `${err.message}`, 409);
    }

  }

  async insertMany(data) {
    const ctx = 'mongodb-insertMany';
    const document = data;
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.insertMany(document);
      if (recordset.result.n < 1) {
        return wrapper.error('Internal Server Error', 'Failed Inserting Data to Database', 500);
      }
      return wrapper.data(document, 'created', 201);

    } catch (err) {
      return wrapper.error(`Error Insert Many Mongo ${err.message}`, `${err.message}`, 409);
    }

  }

  async upsertOne(parameter, updateQuery) {
    const ctx = 'mongodb-upsertOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.update(parameter, updateQuery);
      if (data.result.nModified >= 0) {
        const { result: { nModified } } = data;
        const recordset = await this.findOne(parameter);
        if (nModified === 0) {
          return wrapper.data(recordset.data, 'created', 201);
        }
        return wrapper.data(recordset.data, 'updated', 204);

      }
      return wrapper.error('Failed upsert data', 'failed', 409);
    } catch (err) {
      return wrapper.error(`Error Upsert Mongo ${err.message}`, `${err.message}`, 409);
    }

  }

  async findAllData(fieldName, row, page, param) {
    const ctx = 'mongodb-findAllData';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const parameterSort = {};
      parameterSort[fieldName] = 1;
      const parameterPage = row * (page - 1);
      const recordset = await db.find(param).sort(parameterSort).limit(row).skip(parameterPage)
        .toArray();
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found', 'Please Try Another Input', 404);
      }
      return wrapper.data(recordset);

    } catch (err) {
      return wrapper.error('Error Mongo', `${err.message}`, 409);
    }
  }

  async findAllTemp(parameter, fieldName, by, page, count) {
    const ctx = 'mongodb-findAllTemp';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      let parameterSort = {};
      parameterSort[fieldName] = by;
      const parameterPage = count * (page - 1);
      const recordset = await db.find(parameter).sort(parameterSort).limit(count).skip(parameterPage).toArray();
      return wrapper.data(recordset);
    } catch (err) {
      return wrapper.error(err, err.message, 503);
    }
  }

  async countData(param) {
    const ctx = 'mongodb-countData';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.count(param);
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data Not Found', 'Please Try Another Input', 404);
      }
      return wrapper.data(recordset);

    } catch (err) {
      return wrapper.error('Error Mongo', `${err.message}`, 409);
    }
  }

  async delete(param) {
    const ctx = 'mongodb-delete';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const deleteData = await db.deleteOne(param);
      if (validate.isEmpty(deleteData)) {
        return wrapper.error('Data Not Found', 'Please Try Another Input', 404);
      }
      const recordset = await this.findOne(param);

      return wrapper.data(recordset.data, 'deleted', 204);
    } catch (err) {
      return wrapper.error(`Error delete Mongo ${err.message}`, `${err.message}`, 409);
    }
  }

  async upsertOneFilter(parameter, updateQuery, filter) {
    const ctx = 'mongodb-upsertOne';
    const dbName = await this.getDatabase();
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.update(parameter, updateQuery, filter);
      if (data.result.nModified >= 0) {
        const { result: { nModified } } = data;
        const recordset = await this.findOne(parameter);
        if (nModified === 0) {
          return wrapper.data(recordset.data, 'created', 201);
        }
        return wrapper.data(recordset.data, 'updated', 204);

      }
      return wrapper.error('Failed upsert data', 'failed', 409);
    } catch (err) {
      return wrapper.error(`Error Upsert Mongo ${err.message}`, `${err.message}`, 409);
    }
  }
}

module.exports = DB;
