import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('vehicle-list-menu')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <section class="col col-lg-12">
      <nav class="col-lg-6 col-md-6">
        <ul class="nav navbar-nav">
          <li><a href="#">All</a></li>
          <li><a href="#">Available</a></li>
          <li><a href="#">Unavailable</a></li>
          <li><a href="#">Others</a></li>
        </ul>
      </nav>
      <section class="col-lg-6 col-md-6 row">
        <div class="col col-md-8 col-lg-8">
          <input type="text" class="form-control vehicle-search-box">
        </div>
        <div class="col col-2 col-md-2 col-lg-2">
          <button class="btn btn-default  vehicle-search-btn">Find</button>
        </div>
      </section>
    </section>`

    return this.__template
  }
}
