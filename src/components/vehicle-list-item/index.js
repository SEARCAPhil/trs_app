import wigo from './assets/img/wigo.png'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindListeners () {
    this.__template.addEventListener('click', () => {
      window.location = `#/vehicle/${this.__opt.id}/profile`
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-list-item')
    this.__template.innerHTML = `
    <section class="col-lg-3 col-md-4 vehicle-list-item">
      <div class="media">
        <div class="media-left">
          <img src="${wigo}" class="media-object" style="width:100%; min-width: 120px;">
        </div>
        <div class="media-body">
          <p>
            <h4>Toyota Wigo</h4>
            Plate No. <b>ABC-123</b><br/>
            2014 Model
          </p>
        </div>
      </div>
    </section>`
    this.__bindListeners ()
    return this.__template
  }
}
