import style from './index.styl'
import phone from './assets/img/phone.png'

export default class {
  constructor () {
    return this.render()
  }

  __install () {
    // google src
    // https://developers.google.com/web/fundamentals/app-install-banners/
    const btn = this.__template.querySelector('.install-btn')
    btn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      btn.style.disabled = 'disabled';
      // Show the prompt
      window.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      window.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          window.deferredPrompt = null;
        });
    })
  }

  __cancel () {
    this.__template.querySelector('.install-cancel-btn').addEventListener('click', () => {
      this.__template.classList.add('hide-banner')
    })
  }

  __installSuccess () {
    window.addEventListener('appinstalled', (evt) => {
      this.__template.querySelector('.install-device-text').innerHTML = 'Application installed successfully!<br/>You can now access the app on your homescreen or in the chrome://apps/'
      document.querySelectorAll('.install-device-text-alt').forEach((el, index) => el.classList.add('hide')) 
    })
  }
  __bindListeners () {
    this.__installSuccess ()
    this.__install ()
    this.__cancel ()
  }

  async render () {
    this.__template = document.createElement('main')
    this.__template.classList.add('install-notice-section')
    this.__template.innerHTML = `
        <style>${style.toString()}</style>
        <div class="col col-sm-1 col-md-1 col-xs-2 col-lg-1 install-device-text-alt">
          <img src="${phone}" width="50px"/>
        </div>
        <div class="col col-lg-6 col-md-6 col-xs-10 col-sm-6 install-device-text-alt">
          Experience a new Travel Services Management System (TRS) on your device <br/>
          Re-designed from the ground to give you out of the box experience
        </div>
        <div class="col col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right install-device-text" style="padding-top: 10px;">
          Install on your device 
          <button class="btn btn-xs install-cancel-btn">No</button>
          <button class="btn btn-xs install-btn">Ok</button>
        </div>
        `
    this.__bindListeners()
    return this.__template
  }
}
