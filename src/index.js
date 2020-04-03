const fetch = require('node-fetch');
const FormData = require('form-data');

const postUpload = Symbol('postUpload');

module.exports = class Uploader {
  /**
   * Provides functionality for uploading to the CDN using the uploader service.
   *
   * @param {string} baseUrl  The URL to the uploader service.
   * @param {string?} secret  Optional shared secret to pass to the uploader service.
   */
  constructor(baseUrl, secret) {
    this.baseUrl = baseUrl;
    this.secret = secret && encodeURIComponent(secret);
  }

  /**
   * Posts the provided file to the uploader.
   *
   * @param {string} endpoint   The endpoint to post to, relative to baseUrl.
   * @param {Buffer} file       The file to upload.
   * @param {string?} fileName  The original file name.
   */
  async [postUpload](endpoint, file, fileName) {
    const url = `${this.baseUrl}${endpoint}${this.secret ? this.secret : ''}`;
    const form = new FormData();
    form.append('file', file, fileName || 'file');
    return fetch(url, { method: 'POST', body: form, headers: form.getHeaders() })
      .then((res) => res.json());
  }

  /**
   * Uploads a file to the CDN.
   *
   * @param {Buffer} file       The file to upload.
   * @param {string?} fileName  The original file name.
   */
  async file(file, fileName) {
    return this[postUpload]('/', file, fileName);
  }

  /**
   * Uploads an image to the CDN.
   *
   * @param {Buffer} file       The file to upload.
   * @param {string?} fileName  The original file name.
   */
  async image(file, fileName) {
    return this[postUpload]('/image', file, fileName);
  }

  /**
   * Uploads a video to the CDN.
   *
   * @param {Buffer} file       The file to upload.
   * @param {string?} fileName  The original file name.
   */
  async video(file, fileName) {
    return this[postUpload]('/video', file, fileName);
  }
};
