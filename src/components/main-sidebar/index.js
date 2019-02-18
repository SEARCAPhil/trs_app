import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  async render () {
    this.__template = document.createElement('aside')
    this.__template.classList.add('main-sidebar')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="active">
          <a href="#/home"><i class="fa fa-users"></i> <span>Home</span></a>
        </li>
      </ul>

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="header">List</li>
        <li class="active treeview menu-open">
          <a href="#/vehicle"><i class="fa fa-users"></i> <span>Vehicle</span></a>
          <ul class="treeview-menu" style="">
            <li class="active"><a href="#/vehicle/form/"><i class="fa fa-circle-o"></i> <span>Form</span></a></li>
          </ul>
        </li>
      </ul>
  
  

      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 100px;">
        <li><a href="#/signout" style="background: #334852;"><i class="fa fa-long-arrow-left"></i> <span>Sign-out</span></a></li>
      </ul>

      <!-- /.sidebar-menu -->
    </section>`

    return this.__template
  }
}
