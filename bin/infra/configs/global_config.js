require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  dsnSentryUrl: process.env.DSN_SENTRY_URL,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  mysqlConfig: {
    connectionLimit: process.env.DB_MYSQL_CONNECTION_LIMIT,
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    port: process.env.DB_MYSQL_PORT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  },
  redisHost: process.env.REDIS_CLIENT_HOST,
  redisPort: process.env.REDIS_CLIENT_PORT,
  redisPassword: process.env.REDIS_CLIENT_PASSWORD,
  elasticSearchConfig: {
    host: process.env.ELASTIC_SEARCH_URL,
    connectionClass: process.env.ELASTIC_SEARCH_CONNECTION_CLASS,
    apiVersion: process.env.ELASTIC_SEARCH_API_VERSION,
    log: process.env.ELASTIC_SEARCH_LOG
  },
  elasticSearchPool: {
    max: parseInt(process.env.ELASTIC_SEARCH_MAX),
    min: parseInt(process.env.ELASTIC_SEARCH_MIN),
    idleTimeoutMillis: parseInt(process.env.ELASTIC_SEARCH_IDLE)
  },
  minio: {
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    endPoint: process.env.MINIO_END_POINT,
    useSSL: process.env.MINIO_USE_SSL === 'true'
  },
  kafka: {
    kafkaHost: process.env.KAFKA_HOST_URL
  },
  minioBaseUrl: process.env.MINIO_BASE_URL,
  url_user: process.env.URL_USER,
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_CLOUD_SECRET
  },
  cloudinaryBash: process.env.CLOUDINARY_BASH,
  authEmail : {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL
  },
  logo: process.env.LOGO_HIJRAH,
  profileDefault: process.env.PROFILE_DEFAULT,
  imageKajianDefault: process.env.KAJIAN_DEFAULT
};
const store = new confidence.Store(config);

exports.get = key => store.get(key);
