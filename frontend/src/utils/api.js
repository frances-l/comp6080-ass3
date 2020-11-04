const getJSON = (path, options) => fetch(path, options)
  .then((res) => res.json())
  .catch((err) => console.warn(`API_ERROR: ${err.message}`));

const BACKEND_URL = 'http://localhost:5005/';
export default class API {
/** @param {String} url */
  constructor(url = BACKEND_URL) {
    this.url = url;
  }

  makeAPIRequest(path, options) {
    return getJSON(`${this.url}/${path}`, options);
  }

  post(path, options) {
    return getJSON(`${this.url}/${path}`, {
      ...options,
      method: 'POST',
    });
  }

  put(path, options) {
    return getJSON(`${this.url}/${path}`, {
      ...options,
      method: 'PUT',
    });
  }

  get(path, options) {
    return getJSON(`${this.url}/${path}`, {
      ...options,
      method: 'GET',
    });
  }

  delete(path, options) {
    return getJSON(`${this.url}/${path}`, {
      ...options,
      method: 'DELETE',
    });
  }
}
