import style from './index.styl'
import PubSub from 'pubsub-js'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  setActiveNav (nav) {
    this.__template.querySelectorAll('.sidebar-menu > li').forEach((el, index) => {
      if(el.classList.contains(nav)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }
  __bindListeners () {
    PubSub.unsubscribe('MAIN_NAV')
    PubSub.subscribe('MAIN_NAV', (msg, data) => {
      this.setActiveNav (data) 
    })
  }

  async render () {
    this.__template = document.createElement('aside')
    this.__template.classList.add('main-sidebar')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <!-- sidebar: style can be found in sidebar.less -->
    <nav class="sidebar">
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="home">
          <a href="#/home"><i class="fa fa-users"></i> <span>Home</span></a>
        </li>
      </ul>

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="header">List</li>
        <!--<li class="vehicle">
          <a href="#/vehicle"><i class="fa fa-car"></i> <span>Vehicle</span></a>
        </li>
        <li class="driver">
          <a href="#/driver"><i class="fa fa-user-tie"></i> <span>Drivers</span></a>
        </li>-->
        <li class="gasoline">
          <a href="#/gasoline"><i class="fa fa-gas-pump"></i> <span>Gasoline List</span></a>
        </li>
        <li class="header">General Forms</li>
        <!--<li class="time">
          <a href="#/vehicle/forms/time"><i class="fa fa-hourglass-half"></i> <span>Time Record</span></a>
        </li>-->
        <li class="gasoline-form">
          <a href="#/vehicle/forms/gasoline"><i class="fa fa-gas-pump"></i> <span>Gasoline Form</span></a>
        </li>
        <!--<li class="header">Reports</li>
        <li class="disabled">
          <a href="#/vehicle"><i class="fa fa-users"></i> <span>Gasoline Overlay</span></a>
        </li>-->
      </ul>

      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 100px;">
        <li><a href="#/signout" style="background: #353738;"><i class="fa fa-long-arrow-left"></i> <span>Sign-out</span></a></li>
      </ul>

      <!-- /.sidebar-menu -->
    </nav>`
    this.__bindListeners ()
    return this.__template
  }
}
