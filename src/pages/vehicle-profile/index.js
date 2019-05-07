import style from './style'
import wigo from '../../components/vehicle-list-item/assets/img/wigo.png'

export default class {
  constructor () {
    return this.render()
  }

  __bindListeners () {
    //this.__bindChart ()
    this.loadMenuSection ()
    
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

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section', 'row')
    this.__template.innerHTML =   `
      <style>${style.toString()}</style>
      <vehicle-profile-menu></vehicle-profile-menu>
      <article class="col col-lg-12 col-md-12 vehicle-profile-section">
       <section class="col col-lg-3 text-center" style="padding-top: 50px;">
          <img src="${wigo}" width="200px">
          <div class="col col-md-12 col-lg-12 col-sm-12">
            <a href="#" class="text-muted">Change Photo</a>
          </div>
       </section>

       <section class="col col-lg-6">
          <h3>Lorem Impsum</h3>
          <p><b>Year</b> : 2019</p>
          <p><b>Make</b> : Toyota</p>
          <p><b>Model</b> : Wigo</p>
          <p><b>Color</b> : White</p>
          <p><b>Engine No.</b> : xyzabc1234</p>
          <p><b>Transmission Type</b> : Automatic</p>
          <p><b>Vehicle Classification</b> : Box Type</p>
          <p><b>Conduction No.</b> : </p>
          <p><b>Plate No.</b> : ABC-1234</p>
          <p><b>Date Acquired</b> : May 3, 2019</p>
          <p><b>Date Registered</b> : August 3, 2019</p>
          <p><b>Notes</b> :</p>
          <p class="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
          Proin erat sapien, ultrices a egestas sed, pellentesque pretium lectus. <br/>
          Fusce volutpat ante in tortor cursus euismod. Praesent et fringilla felis.
          </p>
       </section>

      </article>`
    this.__bindListeners()
    return this.__template
  }
}