import { tns } from "tiny-slider/src/tiny-slider.module.js"
import style from './style'
import install from './assets/img/install.png'
import running from './assets/img/running.png'
import PubSub from 'pubsub-js'

export default class {
  constructor () {
    return this.render()
  }

  loadSlider () {
    return tns({
      container: '.my-slider',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      center: true,
      controls: false,
      navPosition: "bottom",
      speed: 200,
      lazyload: true
    })
  }

  async __bindListener () { 
    // set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'home')

    if(document.querySelector('.ajax-main-section')) {
      setTimeout(() => this.loadSlider () ,1)
    }

  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('home-section')
    this.__template.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/tiny-slider.css">
      <style>${style.toString()}</style>
      <div class="home-section-text">
        <section class="col col-xs-12 col-lg-12 col-md-12">
          <div class="my-slider">
          <!-- home -->
            <div>
              <center>
                <img data-src="assets/img/bag.png" width="150px" class="tns-lazy-img"/>
                <h3>Travel Services Management System</h3>
                <p>You can now use and enjoy the improved version of TRS. <br/>
                Managing your land travel is now easier and faster, everything is at your fingertip!</p>
              </center>
            </div>

            <div>
              <center>
                <img data-src="${install}" width="200px" class="tns-lazy-img"/>
                <h3>Install on your mobile phone!</h3>
                <p>
                  You are just <b>1 step away</b>!  Simply install this on your device without going to google store or app store!<br/>
                  Just go to > <b>Settings > Install Travel Services Management System</b>              
                </p>
              </center>
            </div>

            <div>
              <center>
                <img data-src="${running}" width="200px" class="tns-lazy-img"/>
                <h3 class="text-larger">3x faster</h3>
                <p>
                  You can now enjoy faster application loading experience<br/>
                  The system now load files and images faster than ever before. There is<br/>
                  no need to wait untill tomorrow!              
                </p>
              </center>
            </div>
          </div>
        </section>

      </div>

    

    `
    this.__bindListener ()
    return this.__template
  }
}
