/* eslint-disable new-cap */
import style from './style'
import * as LibName from "vanilla-js-calendar"
import style2 from 'vanilla-js-calendar/dist/js-calendar.css'




export default class {
  constructor () {
    return this.render()
  }

  __bindListeners () {
    // this.__bindChart ()
    this.loadMenuSection()
   // this.loadDateMenuSelection()
   // this.loadTable()
   this.loadCalendar()
  }

  loadCalendar () {
    let JSCalendar = LibName.JSCalendar;
    let JSCalendarEvent = LibName.JSCalendarEvent;
    let calendar = new JSCalendar(this.__template.querySelector('vehicle-calendar'), { /* options */ }).init()

    var today = new Date();

            var matrix = {};
            matrix[today.getFullYear()] = {};
            matrix[today.getFullYear()][today.getMonth()] = {
                "5"  : [{displayname : "You can't miss this event", color : "#792aca"}],
                "12" : [
                    {
                        displayname : "OUT", 
                        at : new Date(today.getFullYear(), today.getMonth(), 12, 15, 30).getTime()
                    },
                    {
                        displayname : "IN", 
                        color : "rgb(113, 180, 193)",
                        at : new Date(today.getFullYear(), today.getMonth(), 12, 17, 30).getTime(),
                        duration : 1000 * 60 * 60 * 2
                    },
                    {
                        displayname : "This meeting is so important it's red", 
                        color : "#9c3d27",
                        at : new Date(today.getFullYear(), today.getMonth(), 12, 21, 55).toString()
                    }
                ],
                "15" : [
                    {
                        displayname : "Something else to do here", 
                        at : new Date(0, 0, 0, 9, 30).toString()
                    },
                    {
                        displayname : "Similar event", 
                        at : new Date(0, 0, 0, 9, 50).toString(),
                        duration : 1000 * 60 * 10,
                        color : "#5198da"
                    }
                ],
                "16" : [{displayname : "Something to do here"}],
                "17" : [{at : new Date(0, 0, 0, 10, 25).getTime()}],
                "26" : [
                    {
                        displayname : "An event by the end of the month",
                        at : new Date(0,0,0, 9)
                    }
                ],
                "27" : [
                    {
                        displayname : "Short monthly recap meeting",
                        at : new Date(0,0,0, 15, 30),
                        color : "rgb(113, 180, 193)",
                        duration : 1000 * 60 * 30
                    }
                ]
            };

          calendar.on('dragging', (calendar, extra) => {
            extra.monthElem.classList.remove('dragged')
            
            document.querySelectorAll('table.calendar-table > tr > td ').forEach(el => {
              el.parentNode.replaceChild(el.cloneNode(true), el);
            })
          })
          calendar.setMatrix(matrix).render()

  

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
