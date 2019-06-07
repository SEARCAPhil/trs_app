/* eslint-disable new-cap */
import style from './style'
import * as LibName from "vanilla-js-calendar"
import style2 from 'vanilla-js-calendar/dist/js-calendar.css'
import { O_DSYNC } from 'constants';


export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render()
  }

  __bindListeners () {
    // this.__bindChart ()
    this.loadMenuSection()
   // this.loadDateMenuSelection()
   // this.loadTable()
   this.loadCalendar()
  }

  async getRecord (opt) {
    this.records = new (await import('./actions/lists')).default()
    return this.records.getRecordsPerVehicleAndDate(opt)
  }

  parseCalendarTds () {
    document.querySelectorAll('table.calendar-table > tr > td ').forEach(el => {
      let newEl = el.cloneNode(true)
      el.parentNode.replaceChild(newEl, el);

      newEl.querySelectorAll('.cell-event-mark').forEach(div => {
        // add more listeners here
        div.addEventListener('click', this.viewRecord.bind(this))
      })
    })
  }

  loadCalendar () {
    // initialize calendar
    let JSCalendar = LibName.JSCalendar;
    let calendar = new JSCalendar(this.__template.querySelector('vehicle-calendar'), { /* options */ }).init()
    let today = new Date();

    // prevent dragging
    calendar.on('dragging', (calendar, extra) => {
      extra.monthElem.classList.remove('dragged')
      //this.parseCalendarTds ()
    })

    calendar.on('rendered', () => {
     // this.parseCalendarTds ()
    })

    calendar.on('matrixSet', (calendar, extra) => {
      console.log(extra)
    })
      
    // get all time records
    this.getRecord ({id: this.__opt.id, date: '2019-06-01'}).then(res => {
      var matrix = {};
      matrix[today.getFullYear()] = {};
      matrix[today.getFullYear()][today.getMonth()] = { }

      res.data.forEach(el => {
        let day = el.date.substring(8)
        day = day < 10 ? day.substring(1) : day

        if(!matrix[today.getFullYear()][today.getMonth()][day]) {
          matrix[today.getFullYear()][today.getMonth()][day] = []
        }

        matrix[today.getFullYear()][today.getMonth()][day].push({
          displayname : el.mode.toUpperCase() + " " + el.driver_details_in_view.last_name, 
          color : el.mode === 'in' ? "rgb(113, 180, 193)" : '#e91e63',
          at : new Date(today.getFullYear(), today.getMonth(), 12, el.time.substring(0,2), el.time.substring(3,5)).getTime(),
          hi : '2'
        }) 
      })
      // show data to calendar
      calendar.setMatrix(matrix, function (e) {
        console.log(e)
      }).render()

      calendar.on('click', (e) => {
        console.log('clicked')
      })
    })
  }

  viewRecord () {
    alert('a')
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
      <style>
        ${style2.toString()} 
        ${style.toString()}
      </style>
      <vehicle-profile-menu></vehicle-profile-menu>
        <article class="col col-lg-12 col-md-12 vehicle-profile-section">
          <date-selection-menu-bar></date-selection-menu-bar>
          <main class="col col-lg-12 col-md-12">
            <vehicle-calendar></vehicle-calendar>
            <vehicle-time-record-table></vehicle-time-record-table>

            <!--<section class="col col-lg-12 col-md-12">
            </section>-->
          </main>
        </article>`
    this.__bindListeners()
    return this.__template
  }
}
