/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  __bindListeners () {
    // this.__bindChart ()
    this.loadMenuSection()
    // mock vehicles
    for (let x = 0; x < 5; x++) { this.loadVehicleItems({ id: x }) }
  }

  loadMenuSection (opt) {
    const __menu = import('../../components/vehicle-list-menu')
    const __target = this.__template.querySelector('.vehicle-list-menu') || this.__template.querySelector('vehicle-list-menu')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  loadVehicleItems (opt) {
    const __menu = import('../../components/vehicle-list-item')
    const __target = this.__template.querySelector('.car-box-container')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        __target.append(html)
      })
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <vehicle-list-menu></vehicle-list-menu>
      <article class="col col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <section class="col col-lg-12" style="padding: 20px;margin:20px 20px;">
          <h3>SEARCA's list of aquired vehicles</h3>
          <p class="text-muted">
            Click the vehicle to see their full information<br/> 
            <!--<button class="btn btn-sm btn-primary">New</button>-->
          </p>
          <hr/>
        </section>
      </article>
      <article class="car-box-container col-lg-12"></article>`
    this.__bindListeners()
    return this.__template
  }
}
