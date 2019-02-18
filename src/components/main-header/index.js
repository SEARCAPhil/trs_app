import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindListeners () {
    let btn = this.__template.querySelector('.main-menu-btn')
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.toggle('sidebar-open')
    })
  }

  async render () {
    this.__template = document.createElement('header')
    this.__template.classList.add('main-header')
    this.__template.innerHTML = `
        <style>${style.toString()}</style>
        <!-- Header Navbar -->
        <a href="#" class="logo hidden-xs" style="background-color: #353738;">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>A</b>LT</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg">
            <center>

            </center>
          </span>
        </a>

        <nav class="navbar navbar-static-top main-navbar" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle main-menu-btn" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- User Account Menu -->
              <li class="dropdown user user-menu">
                <!-- Menu Toggle Button -->
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <!-- The user image in the navbar-->
                  ${this.__opt.image ? '<img src="' + this.__opt.image + '" class="user-image" alt="User Image"/>' : ''}
                  <!-- hidden-xs hides the username on small devices so only the image appears. -->
                  <span class="hidden-xs">${this.__opt.displayName}</span>
                </a>
                <ul class="dropdown-menu">
                  <!-- The user image in the menu -->
                  <li class="user-header">
                    <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
      
                    <p>
                      Alexander Pierce - Web Developer
                      <small>Member since Nov. 2012</small>
                    </p>
                  </li>
                  <!-- Menu Body -->
                  <li class="user-body">
                    <div class="row">
                      <div class="col-xs-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div class="col-xs-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div class="col-xs-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </div>
                    <!-- /.row -->
                  </li>
                  <!-- Menu Footer-->
                  <li class="user-footer">
                    <div class="pull-left">
                      <a href="#" class="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div class="pull-right">
                      <a href="#" class="btn btn-default btn-flat">Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>`
    this.__bindListeners()
    return this.__template
  }
}
