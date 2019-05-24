import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  goToLink () {

  }

  __bindListener () {
    this.__template.querySelectorAll('.nav-link').forEach((el, index) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        window.location = e.target.href
      })
    })

    this.goToLink()
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('vehicle-profile-menu')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <section class="col col-lg-12">
      <nav class="col-lg-6 col-md-12">
        <ul class="nav navbar-nav">
          <li><a href="#/vehicle/${this.__opt.id}/profile">Info</a></li>
          <li><a href="#/vehicle/${this.__opt.id}/time" class="nav-link">Time Record</a></li>
          <li class="disabled"><a href="#">Gasoline History</a></li>
          <li class="disabled"><a href="#">Repair/Maintenance</a></li>
          <li class="disabled"><a href="#">Oil</a></li>
        </ul>
      </nav>
    </section>`
    this.__bindListener()
    return this.__template
  }
}
