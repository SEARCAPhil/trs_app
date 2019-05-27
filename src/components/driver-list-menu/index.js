import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('driver-list-menu')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <section class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <nav class="col-lg-6 col-md-6 col-sm-8">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">All</a></li>
          <li class="disabled"><a class="text-muted">Available</a></li>
          <li class="disabled"><a class="text-muted">Unavailable</a></li>
        </ul>
      </nav>
      <section class="col-lg-6 col-md-6 col-sm-4 row">
        <div class="col col-md-8 col-lg-8 col-sm-9">
          <input type="text" class="form-control driver-search-box">
        </div>
        <div class="col col-2 col-md-2 col-lg-2 col-sm-3">
          <button class="btn btn-default  driver-search-btn">Find</button>
        </div>
      </section>
    </section>`

    return this.__template
  }
}
