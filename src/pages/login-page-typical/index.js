/* eslint-disable new-cap */
export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    return this.render(opt)
  }

  __bindLogin () {
   
  }

  __bindListeners (opt = {}) {
    //this.__bindLogin()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-section')
    this.__template.innerHTML = `
    <style>
      body{
        background: #fff !important;
        overflow: hidden;
      }
      .main-login {
        height:100vh;
        overflow:hidden;
      }
      .main-login-banner {
        height:100vh;
        padding-top:10%;
        z-index:1;
        position:relative;
      }

      .main-login-backdrop {
        float:left;
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        z-index:1;
      }

      .main-login-banner-text {
        float:left;
        position:absolute;
        height:100%;
        top:150px;
        z-index:2;
      }


      .green {
        color: #23f98b;
      }

      .sub-login-banner {
        padding-top:7%;
        position:relative;
        height:100%;
        overflow:hidden;
        overflow-y: auto;
      }
      .go-to-app-btn {
        border-radius: 50px !important;
        color: #fff !important;
        background: #e91e63 !important;
        padding: 15px !important;
        text-transform: none !important;
      }
      .doodle-section {
        height:100%;
        width:100%;
        background:url('assets/img/doodle.png') no-repeat;
        overflow:hidden;
        position:absolute;
        z-index:0;
        top:45%;
      }
      .sub-banner-deco {
        position:absolute;
        height:30vh;
        width:50%;
        background:url('assets/img/sub-banner-deco.png') no-repeat;
        background-size:cover;
        overflow:hidden;
        bottom:0;
        right:0;
      }
    </style>
    <div style="min-height: 1170px;">
    <article class="main-login row">
 
    <section class="col col-10 col-lg-offset-5 col-md-offset-4 col-sm-offset-2 col-xs-offset-1 col-md-4  col-lg-2 col-xs-10 main-login-banner">
        <div class="main-login-banner-text"> 
            <h3>Travel Services Management System</h3>
            <p style="color:#c1c1c1;">
              Monitor your land travel in one place! <span class="green">Book your travel</span> and we will take care the rest
            </p>
            <br><br>
            <h3 class="text-muted">Sign-in</h3>
            <div class="form-group">
              <input class="form-control" type="text" placeholder="Username / Email"/>
            </div>
            <div class="form-group">
             <input class="form-control" type="password" placeholder="Password"/>
            </div>

            <div class="form-group">
              <button class="btn btn-block btn-info">LOGIN</button>
           </div>
        </div>
        <div class="main-login-backdrop"></div>
        
    </section>
<div class="doodle-section"></div>
<!--end content-->
</article>`
    this.__bindListeners()
    return this.__template
  }
}
