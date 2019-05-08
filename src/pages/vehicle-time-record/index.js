/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  __bindListeners () {
    // this.__bindChart ()
    this.loadMenuSection()
    this.loadDateMenuSelection()
    this.loadTable()
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

  loadDateMenuSelection (opt) {
    const __menu = import('../../components/date-selection-menu-bar')
    const __target = this.__template.querySelector('.date-selection-menu-bar') || this.__template.querySelector('date-selection-menu-bar')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  loadTable (opt) {
    const __menu = import('../../components/vehicle-time-record-table')
    const __target = this.__template.querySelector('.vehicle-time-record-table') || this.__template.querySelector('vehicle-time-record-table')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section', 'row')
    // this.__dateFields = this.generateDateFields ()
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <vehicle-profile-menu></vehicle-profile-menu>
      <article class="col col-lg-12 col-md-12 vehicle-profile-section">
        <date-selection-menu-bar></date-selection-menu-bar>
        <vehicle-time-record-table></vehicle-time-record-table>

        <!--<section class="col col-lg-12 col-md-12">
        </section>-->

      </article>`
    this.__bindListeners()
    return this.__template
  }
}
