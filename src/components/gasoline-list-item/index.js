import user from './assets/img/user.png'
import style from './style'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__opt.profile = this.__opt.profile || {}
    this.profileName = this.__opt.profile.profile_name || `${this.__opt.profile.first_name || ''} ${this.__opt.profile.middle_name || ''} ${this.__opt.profile.last_name || ''}`
    return this.render(opt)
  }

  __bindListeners () {
    this.__template.addEventListener('click', () => {
      window.location = `#/gasoline/1/profile`
    })
  }

  async render () {
    this.__template = document.createElement('div')
    this.__template.classList.add('gasoline-list-item', 'media')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <div class="media-left">
        <i class="fa fa-gas-pump text-muted large-icon"></i>
      </div>
      <div class="media-body">
        <h4 class="media-heading">ADS #53</h4>
        <p>
          <b>Trip Ticket Number : </b> 1024<br>
          <b>Liters :</b> <span class="badge badge-dark">0</span><br>
          <b>Amount :</b> <span class="text-danger">PHP 5,500.00</span><br>
          <b>Vehicle :</b> Toyota Innova 143<br>
          <i class="fa fa-map-marker-alt text-muted"></i> Caballero Shell Service Station III<br>
        </p>
      </div>`
    this.__bindListeners()
    return this.__template
  }
}
