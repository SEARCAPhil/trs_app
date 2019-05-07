import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('vehicle-profile-menu')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <section class="col col-lg-12">
      <nav class="col-lg-6 col-md-6">
        <ul class="nav navbar-nav">
          <li><a href="#">Info</a></li>
          <li><a href="#">Time Record</a></li>
          <li class="disabled"><a href="#">Gasoline History</a></li>
          <li class="disabled"><a href="#">Repair/Maintenance</a></li>
          <li class="disabled"><a href="#">Oil</a></li>
        </ul>
      </nav>
    </section>`

    return this.__template
  }
}
