const cloudinary = require('cloudinary');
const wrapper = require('../utils/wrapper');
const config = require('../../infra/configs/global_config')

cloudinary.config(config.get('/cloudinary'))

const uploadOne = async (imagetPath) => {
  const isUploaded = await cloudinary.uploader.upload(imagetPath)
  if (isUploaded.err) {
    return wrapper.error(isUploaded.err);
  }
  return wrapper.data(isUploaded.url);
}

module.exports = { uploadOne }