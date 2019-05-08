import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindListeners () {
    document.addEventListener('scroll', (e) => {
      // hide container if user scrolls at the middle
      if ((document.body.scrollTop + document.body.clientHeight) >= document.body.scrollHeight / 2) {
        return this.__template.classList.add('hide-cookie')
      }

      return this.__template.classList.remove('hide-cookie')
    })
  }

  async render () {
    this.__template = document.createElement('main')
    this.__template.classList.add('cookie-section')
    this.__template.innerHTML = `
        <style>${style.toString()}</style>
        <div class="col col-sm-2 col-md-2 col-xs-2 col-lg-1">
          <img src="assets/img/cookie.png" width="30px"/>
        </div>
        <div class="col col-lg-10">This system uses 'cookies'to give you the best, most <br/>relevant experience. Using the system means you are O'k with this. 
        <a href="https://us.norton.com/internetsecurity-how-to-what-are-cookies.html">Learn More</a></div>
        `
    this.__bindListeners()
    return this.__template
  }
}
