/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render()
  }

  async __bindListeners () {
    // set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'driver')
    this.loadMenuSection(this.__opt)
    this.loadTable(this.__opt)
  }

  async getRecord (opt) {
    this.records = new (await import('./actions/lists')).default()
    return this.records.getRecordsPerVehicleAndDate(opt)
  }


  loadRecords () {
     // get all time records
     this.getRecord ({id: this.__opt.id, date:''}).then(res => {
      res.data.forEach(el => {
      })
    })
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
      <style>
        ${style.toString()}
      </style>
      <vehicle-profile-menu></vehicle-profile-menu>
        <article class="col col-lg-12 col-md-12 vehicle-profile-section">
          <date-selection-menu-bar></date-selection-menu-bar>
          <main class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <vehicle-time-record-table class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"></vehicle-time-record-table>
          </main>
        </article>`
    this.__bindListeners()
    return this.__template
  }
}
