
const data = (data, description = '', code = 200) => (
  { err: null,
    message: description,
    data,
    code });

const paginationData = (data, meta, description = '', code = 200) => ({ err: null, message: description, data, meta, code });

const error = (err, description, code = 500) => ({ err, code, data: '', message: description });

const response = (res, type, result, message, code) => {
  /* eslint no-param-reassign: 2 */
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status;
  switch (type) {
  case 'fail':
    status = false;
    break;
  case 'success':
    status = true;
    break;
  default:
    status = true;
    break;
  }
  res.status(result.code).send(
    {
      success: status,
      data: result.data,
      message: result.message,
      code: result.code
    });
};

const paginationResponse = (res, type, result, message = null, code = null) => {
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status;
  switch (type) {
  case 'fail':
    status = 'fail';
    break;
  case 'success':
    status = 'success';
    break;
  default:
    status = 'error';
    break;
  }
  res.status(result.code).send(
    {
      status,
      data: result.data,
      meta: result.meta,
      code: result.code,
      message: result.message
    }
  );
};

const responseToken = (res, type, message, code) => {
  /* eslint no-param-reassign: 2 */
  let status;
  switch (type) {
  case 'fail':
    status = false;
    break;
  case 'success':
    status = true;
    break;
  default:
    status = true;
    break;
  }
  res.send(code,
    {
      success: status,
      data: type,
      message: message,
      code: code
    });
};
module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse,
  responseToken
};
