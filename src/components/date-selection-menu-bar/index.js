import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  generateDateFields () {
    let d = '';
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((x, i) => {
      d += `<li><a>${x} 2019</a></li>`
    })

    return d
  }

  __bindListener () {
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('date-selection-menu-bar')
    this.__dateFields = this.generateDateFields()
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <div class="col col-md-1 col-lg-1 col-xs-1">
      <ul class="nav navbar-nav">
        <li><a href="#"><i class="fa fa-chevron-left"></i></a></li>
      </ul>
    </div>
    <div class="col col-md-9 col-lg-9 col-xs-9">
      <nav>
        <ul class="nav-dates">
          ${this.__dateFields}
        </ul>
      </nav>
    </div>
    <div class="col col-md-2 col-lg-2 col-xs-2">
      <ul class="nav navbar-nav">
      <li><a href="#"><i class="fa fa-calendar-alt"></i></a></li>
      <li><a href="#"><i class="fa fa-chevron-right"></i></a></li>
      </ul>
    </div>`
    this.__bindListener()
    return this.__template
  }
}
