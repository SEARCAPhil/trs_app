import { URL } from '../config/api'

export default class {
  constructor () {
    this.timestamp = new Date().getTime()
  }

  xhrDataFactory (url, body, headers = {}, isJson = true, method = 'GET') {
    return new Promise((resolve, reject) => {
      window.fetch(`${URL.fullPath}${url}`,
        {
          method: method,
          body: (isJson ? JSON.stringify(body) : body),
          headers
        })
        .then(res => {
          resolve(res.json())
        })
    })
  }

  putData (url, body, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'PUT')
  }

  postData (url, body, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'POST')
  }

  deleteData (url, body = {}, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'DELETE')
  }

  getData (url, headers = {}) {
    return new Promise((resolve, reject) => {
      window.fetch(`${URL.fullPath}${url}`,
        {
          method: 'GET',
          headers
        })
        .then(res => {
          resolve(res.json())
        })
    })
  }
}
