/* eslint-disable new-cap */
import style from './style'
import wigo from '../../components/vehicle-list-item/assets/img/wigo.png'
import honda from '../../components/vehicle-list-item/assets/img/brands/honda.png'
import toyota from '../../components/vehicle-list-item/assets/img/brands/toyota.png'
import mitsubishi from '../../components/vehicle-list-item/assets/img/brands/mitsubishi.png'

export default class {
  constructor (opt) {
    this.__opt = opt
    this.profile = {}
    this.__timeout = {}
    return this.render()
  }

  async __bindListeners () {
    // set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'vehicle')
    this.loadMenuSection(this.__opt)
    
  }

  loadMenuSection (opt) {
    const __menu = import('../../components/vehicle-profile-menu')
    const __target = this.__template.querySelector('.vehicle-profile-menu') || this.__template.querySelector('vehicle-profile-menu')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  __mapIcon (name) {
    if(name.toLowerCase().indexOf('honda') >= 0) return honda
    if(name.toLowerCase().indexOf('toyota') >= 0) return toyota
    if(name.toLowerCase().indexOf('mitsubishi') >= 0) return mitsubishi
    return wigo
  }

  async loadProfile (opt) { 
    this.profileClass = new (await import('./actions/info')).default(opt)
    return this.profileClass.getDetails()
  }

  async render () {
    this.__profile = (await this.loadProfile(this.__opt))
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section', 'row')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <vehicle-profile-menu></vehicle-profile-menu>
      <article class="col col-lg-12 col-lg-offset-0 col-md-8 col-md-offset-2 vehicle-profile-section">
       <section class="col col-lg-3 text-center" style="padding-top: 50px;">
       <img src="${this.__profile.image ? this.__profile.image : this.__mapIcon(this.__profile.manufacturer) }" style="min-width: 100px;max-width: 200px;">
          <div class="col col-md-12 col-lg-12 col-sm-12">
            <!--<a href="#" class="text-muted">Change Photo</a>-->
          </div>
       </section>

       <section class="col col-lg-6">
          <h3>Lorem Impsum</h3>
          <p><b>Year</b> : ${this.__profile.year || 'N/A'}</p>
          <p><b>Make</b> : ${this.__profile.manufacturer || 'N/A'}</p>
          <p><b>Model</b> : ${this.__profile.model || 'N/A'}</p>
          <p><b>Color</b> : <input type="color" value="${this.__profile.color}" disabled/></p>
          <!--<p><b>Engine No.</b> : xyzabc1234</p>-->
          <p><b>Transmission Type</b> : ${this.__profile.transmission_type || 'N/A'}</p>
          <!--<p><b>Vehicle Classification</b> : Box Type</p>-->
          <p><b>Conduction No.</b> : ${this.__profile.tconduction_no || 'N/A'}</p>
          <p><b>Plate No.</b> : ${this.__profile.plate_no || 'N/A'}</p>
          <p><b>Date Acquired</b> : ${this.__profile.date_acquired || 'N/A'}</p>
          <p><b>Date Registered</b> : ${this.__profile.date_registered || 'N/A'}</p>
          <p><b>Notes</b> : </p>
          <p class="text-muted">${this.__profile.notes|| 'N/A'}</p>
       </section>

      </article>`
    this.__bindListeners()
    return this.__template
  }
}
