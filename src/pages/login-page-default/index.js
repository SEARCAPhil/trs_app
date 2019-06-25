/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    return this.render(opt)
  }

  __bindShowCorporateForm () {
    const __targ = this.__template.querySelectorAll('.btn-corporate-show')
    const __form = this.__template.querySelector('.login-form-corporate')
    const __signOptions = this.__template.querySelector('.sign-in-options')
    const __doodleSec = this.__template.querySelector('.doodle-section')
    __targ.forEach((el, index) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        if(e.target.getAttribute('data-toggle') === 'show') {
          __form.classList.remove('hidden')
          __signOptions.classList.add('hidden')
          __doodleSec.classList.add('doodle-alt')
          import('./actions/corporateAuth').then(res => {
            return new res.default({target: this.__template.querySelector('#corporate-auth-form')})
          })
        } else {
          __form.classList.add('hidden')
          __signOptions.classList.remove('hidden')
          __doodleSec.classList.remove('doodle-alt')
        }
      })
    })
  }

  __bindO365Login () {
    import('./actions/createMSAL').then(loader => {
      return new loader.default({
        root: this.__template,
        target: '.btn-office365'
      })
    })
  }

  __bindListeners (opt = {}) {
    this.__bindO365Login()
    this.__bindShowCorporateForm ()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-section')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <style>
     
      .doodle-section {
        background:url('assets/img/doodle.png') center center no-repeat;
        background-size: cover;
      }

      .doodle-alt {
        background:url('assets/img/doodle3.png') center center no-repeat;
        background-size: cover;
      }
    </style>
    <div style="min-height: 1170px;">
      <article class="main-login row">
  
        <section class="col col-12 col-lg-7 main-login-banner">
            <div class="container col col-lg-10 col-8 col-md-8 col-lg-offset-1 col-sm-offset-2 col-xs-offset-1 col-xs-10 main-login-banner-text"> 
                <h1>Travel Services <br/>Management System</h1>
                <p style="color:#c1c1c1;">
                  Monitor your land travel in one place! <br/>Book your traveland we will take care the rest
                </p>
                <br><br>

                <section class="sign-in-options">
                  <p class="text-muted text-larger">Sign-in options</p>
                  <button class="btn btn-office365 go-to-app-btn">Office365 Account</button>
                  <button class="btn btn-corporate go-to-app-btn btn-corporate-show" data-toggle="show">Corporate Account</button>
                </section>

                <section class="col col-lg-6 col-sm-8  col-md-6 login-form-corporate row hidden">
                  <div class="auth-error-section"></div>
                  <form onsubmit="event.preventDefault()" id="corporate-auth-form">
                    <h4 class="text-muted">Sign-in</h4>
                    <input type="text" class="form-control mb" id="username" placeholder="USERNAME" required>
                    <input type="password" class="form-control mb" placeholder="PASSWORD" id="password" required>
                    <button class="btn btn-corporate go-to-app-btn btn-corporate-auth">SIGN-IN</button>
                    <a href="#" class="btn-corporate-show" data-toggle="hide"><i class="fa fa-arrow-left"></i> CANCEL</a>
                  </form>
                </section>

              
            </div>

           
            <div class="main-login-backdrop"></div>
            <div class="doodle-section"></div>
        </section>



        <section class="col col-lg-5 sub-login-banner">
          <div class="col-lg-10 col-lg-offset-1">
            <br><br>
            <div class="media">
                <div class="media-left"></div>
                <div class="media-body">
                  <h4 class="media-heading">Well structured and organized</h4>
                  <p><small>Classified your records as personal, official or campus travel</small></p>
                </div>
                <hr>
            </div>

            <div class="media">
                <div class="media-left"></div>
                <div class="media-body">
                  <h4 class="media-heading">Safe and secured</h4>
                  <p><small>Stored your data in the cloud with security and privacy. By using your Office365 account, you gain 1 more extra security layer to protect your files against hackers and viruses  </small></p>
                </div>
                <hr>
            </div>
            
            <div class="media">
              <div class="media-left"></div>
              <div class="media-body">
                <h4 class="media-heading">Accessible everywhere</h4>
                <p><small>You can always book your land travel anytime and everytime in the world!</small></p>
              </div>
              <hr>
            </div><br/><br/>
            <p>
              <small>
                By signing in to TRS you are agree to <span class="text-success">Users License agreement</span> and <span class="text-success">Data policy</span> settings of SEARCA
              </small>
            </p>
          </div> 
        </section>

      <!--end content-->
      </article>
    </div>`
    this.__bindListeners()
    return this.__template
  }
}
