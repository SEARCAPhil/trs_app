/* eslint-disable new-cap */
import style from './style'
import wigo from '../../components/vehicle-list-item/assets/img/wigo.png'
import honda from '../../components/vehicle-list-item/assets/img/brands/honda.png'
import toyota from '../../components/vehicle-list-item/assets/img/brands/toyota.png'
import mitsubishi from '../../components/vehicle-list-item/assets/img/brands/mitsubishi.png'
import user from '../../components/driver-list-item/assets/img/user.png'

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
    PubSub.publish('MAIN_NAV', 'driver')
    //this.loadMenuSection(this.__opt)
    
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
      <section class="col col-lg-12 driver-profile-page-header">
        <div class="col col-lg-12 col-md-12"><br/>
          <p><b>Profile Information</b></p>
          <small>
            <p>
              <i class="fa fa-info-circle text-info"></i> This profile might contain sensitive information and should not be shared to anyone
            </p>
          </small>
        </div>
      </section>

      <article class="col col-lg-12 col-md-12" style="margin-top: 50px;">
        <!-- info -->
        <div class="col-md-3 user-profile-section">
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">

              <small><a href="#/contacts/form/5200/update" class=" pull-right"><i class="fa fa-pencil"></i> edit</a></small>

              <img class="profile-user-img img-responsive img-circle" src="${user}" alt="User profile picture">

              <h3 class="profile-username text-center">   </h3>
              <p class="text-center">John D. Hey</p>
              <div class="btn btn-primary btn-block email-list-section" style="background: #009688;">0900000</div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

        <div class="col-md-9 col-lg-6">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#info" data-toggle="tab" aria-expanded="true" class="tabs" data-target="#tab-info" data-group="profile-tab-panes">Info</a></li>
              <li class=""><a href="#lactivities" id="activities" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-activities" data-group="profile-tab-panes">Activities</a></li>
              <li class=""><a href="#settings" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-settings" data-group="profile-tab-panes">Settings</a></li>
            </ul>
            <div class="tab-content">
              
              <div class="tab-pane active" id="tab-info" data-group="profile-tab-panes" style="height: auto;overflow:auto;padding-top: 20px;min-height: 60vh;">
                <p class="text-muted">Basic Details</p><hr/>
                <p><label>First Name</label> : John</p>
                <p><label>Last Name</label> : Hey</p>
                <p><label>Middle Name</label> : Dee</p>
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
      </article>`
    this.__bindListeners()
    return this.__template
  }
}
