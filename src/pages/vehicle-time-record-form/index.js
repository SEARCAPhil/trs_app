/* eslint-disable new-cap */
import style from './style'
const URL = import('../../utils/xhr')

export default class {
  constructor (opt = {}) { 
    this.__opt = opt
    this.__info = {
      driver_details_in_view : {},
      vehicle_details_in_view : {}
    }
    return this.render()
  }

  loadPopup () {
    const popupes = import('../../components/popup-es')
    const popupesStyle = import('../../components/popup-es/index.styl')

    // enable popup
    popupesStyle.then(css => {
      const style = document.createElement('style')
      style.id = 'popup-es-style'
      style.innerHTML = css.default.toString()
      if (!document.querySelector('#popup-es-style')) document.head.append(style)
    })

    popupes.then(loader => new loader.default())
  }

  async getDetails (id) {
    this.xhr = new (await URL).default()
    return this.xhr.getData(`automobile/records/time/${id}`)
  }
  
  bindCreate () {
    import('./actions/create').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '#time-record-form',
        id: this.__opt.id || null
      })
    })
  }

  bindDataListSelector () {
    let inputs = this.__template.querySelectorAll('input[list]');
    for (var i = 0; i < inputs.length; i++) {
      // When the value of the input changes...
      inputs[i].addEventListener('change', (e) => {
        let optionFound = false,
        datalist = e.target.list;
        // Determine whether an option exists with the current value of the input.
        for (var j = 0; j < datalist.options.length; j++) {
          if (e.target.value == datalist.options[j].value) {
              optionFound = true;
              break;
          }
        }
        // remove data-list-value if value does not exist in the datalist
        if (optionFound) { 
          e.target.setAttribute('data-list-value', '')
        } else {
          e.target.setAttribute('data-list-value', e.target.value)
        }
      })
    }
  }

  loadDrivers () {
    import('../driver-page/actions/list').then(comp => {
      const lists = new comp.default ()
      const targ = this.__template.querySelector('#driver')
      lists.getAutomobile ().then(res => { 
        res.data.forEach(el => {
          let item = document.createElement('option')
          item.value = el.uid
          item.innerText = el.profile.profile_name
          targ.append(item)
        })
      })
    })
  }
  
  loadVehicles () {
    import('../vehicle-page/actions/list').then(comp => {
      const lists = new comp.default ()
      const targ = this.__template.querySelector('#vehicle')

      // get vehicle
      lists.getAutomobile ().then(res => { 
        res.data.forEach(el => {
          let item = document.createElement('option')
          item.value = el.id
          item.innerText = `${el.manufacturer || ''}${el.model || ''}(${el.plate_no || ''})`
          targ.append(item)
        })
      })

      // search on keyup
      this.searchVehicle (targ, lists)
    })
  }
  searchVehicle (targ, lists) {
    let timeout = {}
    
    this.__template.querySelector('#vehicle_id').addEventListener('keyup', (e) => {
      clearTimeout(timeout)
      timeout = setTimeout (() => {
        lists.search({param: e.target.value}).then(res => {
          // clear options first
          targ.innerHTML = ''
          res.data.forEach(el => {
            let item = document.createElement('option')
            item.value = el.id
            item.innerText = `${el.manufacturer || ''}${el.model || ''}(${el.plate_no || ''})`
            targ.append(item)
          })
          
        })
      }, 1000)
    })
    
  }

  async __bindListeners () {
    // set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'time')

    this.loadPopup ()
    this.bindCreate ()
    this.bindDataListSelector ()
    this.loadDrivers ()
    this.loadVehicles ()
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

  async render () {
    if(this.__opt.id) this.__info = (await this.getDetails(this.__opt.id))
    if(!this.__info.driver_details_in_view) this.__info.driver_details_in_view = {} 
    if(!this.__info.vehicle_details_in_view) this.__info.vehicle_details_in_view = {} 

    const dateTime = new Date()
    const month = dateTime.getMonth() < 10 ? `0${dateTime.getMonth()}` : dateTime.getMonth()
    const day = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const date = `${dateTime.getFullYear()}-${month}-${day}`
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-time-record-form-page', 'row')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <form name="time-record-form" onsubmit="return false;" id="time-record-form">
        <section class="col col-lg-12 time-record-page-header">
          <div class="col col-lg-12 col-md-12"><br/>
            <p><b>Vehicle Time Record Form</b></p>
            <small>
              <p>
                Allow to easily track the time in/out of vehicle in the organization.<br/>
              </p>
            </small>
          </div>
        </section>

        <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
          <div class="col col-md-4  mb">
          <label>Date</label>
          <p class="text-muted">Vehicle goes outside / inside the center</p>
          <input type="date" class="form-control" placeholder="hh::mm (current time is the default)" value="${this.__info.date || date}" id="date"/>
          </div>

          <div class="col col-md-3  mb">
            <label>Time</label>
            <p class="text-muted">Leave blank to use the current time</p>
            <input type="time" class="form-control" placeholder="hh::mm (current time is the default)" id="time" value="${this.__info.time || ''}"/>
          </div>
        </section>

        <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
          <div class="col col-md-4 mb">
            <label>Mode *</label>
            <p class="text-muted">Time out/ In</p>
            <select class="form-control" id="mode">
              <option value="out" ${this.__info.mode === 'out' ? 'selected' : ''}>OUT (default)</option>
              <option value="in" ${this.__info.mode === 'in' ? 'selected' : ''}>IN</option>
            </select>
          </div>

          <div class="col col-md-3 mb">
            <label>Mileage</label>
            <p class="text-muted">(For Travel Use)</p>
            <input type="text" class="form-control" id="mileage" value="${this.__info.mileage || ''}">
          </div>

        </section>
      
        <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
          <div class="col col-md-4 mb">
            <label>Driver ID</label>
            <input list="driver" class="form-control" placeholder="Select a driver or write driver's name (non-employee)" id="driver_id" data-list-value="" autocomplete="off" value="${this.__info.driver_id || ''}"/>
            <datalist id="driver"></datalist>
            <p class="text-success">${this.__info.driver_details_in_view.profile_name || ''}</p>
          </div>

          <div class="col col-md-4">
            <label>Vehicle ID / Plate Number <span class="text-muted">(Non-SEARCA vehicle)</span> *</label>
            <input list="vehicle" class="form-control" id="vehicle_id" required  autocomplete="off" data-list-value="" value="${this.__info.vehicle_id || ''}"/>
            <datalist id="vehicle"></datalist>
            <p class="text-success">${this.__info.vehicle_details_in_view.manufacturer || ''} ${this.__info.vehicle_details_in_view.model || ''} ${this.__info.vehicle_details_in_view.plate_no || ''}</p>
          </div>
        </section>

        <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12 time-record-page-sections">
          <div class="col col-md-4 mb">
            <label>Guard-On-Duty</label>
            <p class="text-muted">Default (current signed-in user)</p>
            <select class="form-control" id="guard_id">
              <option>Please select a guard</option>
            </select>
          </div>

          <div class="col col-md-4">
            <label>Trip Ticket Number (Optional)</label>
            <p class="text-muted">
            <small>PRO Tip : Entering Trip Ticket (TT) number first will <br/>
            automatically fill up vehicle and driver field</small> 
            </p>
            <input type="text" class="form-control" id="tt_number" autocomplete="off">
          </div>
        </section>

        <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
          <div class="col col-md-8">
            <label>Remarks</label>
            <textarea class="form-control" placeholder="This field is optional" rows="5" id="remarks">${this.__info.remarks || ''}</textarea>
          </div>
        </section>

        <section class="col col-lg-8 col-md-8 col-sm-12 col-xs-12 time-record-page-sections">
          <div class="col col-md-3 col-lg-3 col-sm-12 col-xs-12 pull-right">
            <button class="btn btn-block btn-primary vehicle-time-record-form-btn"  type="submit">SAVE</button>
          </div>
        </section>
      </form>

      `
    this.__bindListeners()
    return this.__template
  }
}
