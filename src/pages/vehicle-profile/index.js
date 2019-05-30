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

      <article class="col col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 50px;">
        <!-- info -->
        <div class="col-md-3 user-profile-section">
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">

              <!--<small><a href="#/contacts/form/5200/update" class=" pull-right"><i class="fa fa-pencil"></i> edit</a></small>-->

              <center>
                <img src="${this.__profile.image ? this.__profile.image : this.__mapIcon(this.__profile.manufacturer) }" style="min-width: 100px;max-width: 200px;">
              </center>
              <div class="btn btn-primary btn-block email-list-section" style="background: #009688;">
              ${this.__profile.manufacturer || ''} ${this.__profile.model || ''} ${this.__profile.year || ''}
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

        <div class="col-md-9 col-lg-6">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#info" data-toggle="tab" aria-expanded="true" class="tabs" data-target="#tab-info" data-group="profile-tab-panes">Info</a></li>
              <!--<li class=""><a href="#settings" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-settings" data-group="profile-tab-panes">Settings</a></li>-->
            </ul>
            <div class="tab-content">
              
              <div class="tab-pane active" id="tab-info" data-group="profile-tab-panes" style="height: auto;overflow:auto;padding-top: 20px;min-height: 60vh;">
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
              </div>

              <div class="tab-pane" id="tab-settings" data-group="profile-tab-panes">
                <div class="alert alert-danger">
                  <h4><i class="icon fa fa-ban"></i> Warning</h4>
                    Plese review this account before doing any further actions. If you continue, you will not be able
                    to view his/her profile and any files associated on this account. Please proceed cautiously.
                </div>
                <br>
                <span class="text-muted">Do you still want to proceed ?</span> <br>
                <button class="btn btn-danger remove-account-btn-modal" data-target="#general-modal" data-popup-toggle="open">REMOVE</button>
              </div>

              <div class="tab-pane" id="tab-activities" data-group="profile-tab-panes" style="height: auto;overflow:auto;"></div>


    
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
      </article>
`
    this.__bindListeners()
    return this.__template
  }
}
