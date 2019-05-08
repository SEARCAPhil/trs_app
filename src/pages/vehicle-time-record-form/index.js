/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  __bindListeners () {

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
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-time-record-form-page', 'row')
    // this.__dateFields = this.generateDateFields ()
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <section class="col col-lg-12 time-record-page-header">
        <div class="col col-lg-12 col-md-12"><br/>
          <p><b>Vehicle Time Record Form</b></p>
          <small>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
              Proin erat sapien, ultrices a egestas sed, pellentesque pretium lectus.<br/>
              Fusce volutpat ante in tortor cursus euismod. Praesent et fringilla felis.
            </p>
          </small>
        </div>
      </section>

      <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
        <div class="col col-md-4  mb">
         <label>Date</label>
         <p class="text-muted">Vehicle goes outside / inside the center</p>
         <input type="date" class="form-control" placeholder="hh::mm (current time is the default)"/>
        </div>

        <div class="col col-md-3  mb">
          <label>Time</label>
          <p>&nbsp;</p>
          <input type="time" class="form-control" placeholder="hh::mm (current time is the default)"/>
        </div>
      </section>

      <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
        <div class="col col-md-3 mb">
          <label>Mode *</label>
          <p class="text-muted">Time out/ In</p>
          <input type="text" class="form-control" placeholder="OUT (default)"/>
        </div>
      </section>
      
      <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
        <div class="col col-md-4 mb">
          <label>Driver</label>
          <select class="form-control">
            <option>Please select a driver</option>
          </select>
        </div>

        <div class="col col-md-4">
          <label>Vehicle</label>
          <select class="form-control">
            <option>Please select a vehicle</option>
          </select>
        </div>
      </section>

      <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12 time-record-page-sections">
        <div class="col col-md-4 mb">
          <label>Guard-On-Duty *</label>
          <select class="form-control">
            <option>Please select a guard</option>
          </select>
        </div>

        <div class="col col-md-4">
          <label>Trip Ticket Number (Optional)</label>
          <select class="form-control">
            <option>Please select a driver</option>
          </select>
          <p class="text-muted">
          <small>PRO Tip : Entering Trip Ticket (TT) number first will <br/>
          automatically fill up vehicle and driver field</small> 
          </p>
        </div>
      </section>

      <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12  time-record-page-sections">
        <div class="col col-md-8">
          <label>Remarks</label>
          <textarea class="form-control" placeholder="This field is optional" rows="5"></textarea>
        </div>
      </section>

      <section class="col col-lg-8 col-md-8 col-sm-12 col-xs-12 time-record-page-sections">
        <div class="col col-md-3 col-lg-3 col-sm-12 col-xs-12 pull-right">
          <button class="btn btn-block btn-primary">SAVE</button>
        </div>
      </section>


      `
    this.__bindListeners()
    return this.__template
  }
}
