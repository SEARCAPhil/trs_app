export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__profile = {}
  }
  set (data) {
    window.localStorage.setItem('profile', JSON.stringify(data))
  }

  get () {
    this.__profile = window.localStorage.getItem('profile')
    return this.__profile ? JSON.parse(this.__profile) : {}
  }

  clear () {
    window.localStorage.clear()
    window.sessionStorage.clear()
    return this
  }

  setAccessToken (accessToken) {
    // set in private mode
    window.localStorage.setItem('trs.access_token', accessToken)
  }

  getAccessToken () {
    // set in private mode
    return window.localStorage.getItem('trs.access_token')
  }
}
