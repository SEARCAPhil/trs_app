import wigo from './assets/img/wigo.png'
import honda from './assets/img/brands/honda.png'
import toyota from './assets/img/brands/toyota.png'
import mitsubishi from './assets/img/brands/mitsubishi.png'
import style from './style'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __mapIcon (name) {
    if(name.toLowerCase().indexOf('honda') >= 0) return honda
    if(name.toLowerCase().indexOf('toyota') >= 0) return toyota
    if(name.toLowerCase().indexOf('mitsubishi') >= 0) return mitsubishi
    return wigo
  }

  __bindListeners () {
    this.__template.addEventListener('click', () => {
      window.location = `#/vehicle/${this.__opt.id}/profile`
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-list-item', 'col-lg-3', 'col-md-4', 'col-sm-12' ,'col-xs-12')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <div class="media">
        <div class="media-left">
          <img src="${this.__opt.image ? this.__opt.image : this.__mapIcon(this.__opt.manufacturer) }" class="media-object" style="width:100%; min-width: 100px;">
        </div>
        <div class="media-body">
          <p>
            <h4 style="text-transform: capitalized;">${this.__opt.manufacturer || ''} ${this.__opt.model || ''}</h4>
            Plate No. <b>${this.__opt.plate_no.toUpperCase() || this.__opt.conduction_no || ''}</b><br/>
            ${this.__opt.year || ''}
          </p>
        </div>
      </div>`
    this.__bindListeners()
    return this.__template
  }
}
