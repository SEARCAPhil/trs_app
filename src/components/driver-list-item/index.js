import user from './assets/img/user.png'
import style from './style'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindListeners () {
    this.__template.addEventListener('click', () => {
      window.location = `#/driver/${this.__opt.id}/profile`
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('driver-list-item', 'col-lg-3', 'col-md-3', 'col-sm-6' ,'col-xs-12')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <center>
        <img src="${user}" class="media-object" style="width:80px;">
        <p><b>John D. Hey</b></p>
        <span class="text-muted"><i class="fa fa-phone"></i> 09xxxxxxxx</span>
      </center>`
    this.__bindListeners()
    return this.__template
  }
}
