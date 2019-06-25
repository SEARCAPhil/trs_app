import config from '../../../config/trs'

const profiler = import('../../../mixins/profiler')

export default class {
  constructor (opt = {}) {
    this.opt = opt
    this.opt.target = this.opt.target || document
    return  this.render()
  }

  hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
  
    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });
  
    return hexCodes.join('');
  }

  async appLogin (key) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    const formData = new FormData()
    formData.append('app_key', key)
    return this.xhr.postData(`app`, formData, {}, false)
  }

  async login (formData) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    return this.xhr.postData(`auth/corporate`, formData, {}, false)
  }

  showAuthError (error) {
    const authErrorSec = this.opt.target.parentNode.querySelector('.auth-error-section')
    authErrorSec.innerHTML = `<div class="alert alert-danger">${error}</div>`
  }

  hideAuthError (error) {
    const authErrorSec = this.opt.target.parentNode.querySelector('.auth-error-section')
    authErrorSec.innerHTML = ``
  }

  bindSubmit () {
    this.opt.target.addEventListener('submit', (e) => {
      e.preventDefault ()
      let username = this.opt.target.querySelector('#username')
      let password = this.opt.target.querySelector('#password')
      let passSha = ''
      const encoder = new TextEncoder();
      const data = encoder.encode(password.value);
      const digest = crypto.subtle.digest('SHA-1', data);
      digest.then(pass => {
        passSha = this.hexString(pass)
      })

      this.appLogin(config.appKey).then(auth => {
        if(!auth.app_token) return
        const formData = new FormData()
        formData.append('app_token', auth.app_token)
        formData.append('session_id', auth.session_id)
        formData.append('username', username.value)
        formData.append('password', passSha)
        this.login(formData).then(authResult => {
          if(authResult.error) return this.showAuthError (authResult.error)
          this.hideAuthError()
          // set to storage
          window.localStorage.setItem('trs.access_token', JSON.stringify(authResult.access_token))
          window.localStorage.setItem('profile', JSON.stringify(authResult.payload))
          window.location.hash = '#/home'

          profiler.then(res => {
            // set payload with app credentials
            if (!authResult.access_token) return
            // load data and reload browser
            return (new res.default().set(authResult.payload)) | (new res.default().setAccessToken(authResult.access_token)) | window.location.reload()
          })

        })

      }).catch(e => { console.log(e)
        alert('Server Error. Please try again later')
      })
    })
  }
  render () {
    this.bindSubmit()
  }
}