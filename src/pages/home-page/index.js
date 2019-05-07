import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('home-section')
    this.__template.innerHTML =   `
      <style>${style.toString()}</style>
      <div class="home-section-text">
        <center>
          <img src="assets/img/bag.png" width="130px"/>
          <h3>Travel Services Management System</h3>
          <p>Manage your land travel at one place!</p>
        </center>
      </div>
    `
    return this.__template
  }
}