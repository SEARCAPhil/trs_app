export default class {
  constructor (opt = {}) {
    this.opt = opt
    this.opt.tabHandleClass = 'tabs'
    this.opt.root = opt.root || document
    this.opt.activeClass = 'active'
    this.__targetPanes = {}
    this.callback = {}
  }

  __bindHandles (callback) {
    let __proto__ = Object.create(this)
    this.opt.root.querySelectorAll(`.${this.opt.tabHandleClass}`).forEach((el, index) => {
      el.callback = callback
      el.addEventListener('click', this.setTab.bind(__proto__))
    })
  }

  setTab (e) {
    e.preventDefault()
    // show tab pages
    this.__targetPanes = document.querySelectorAll(e.target.getAttribute('data-target'))
    document.querySelectorAll(`.tabs[data-group="${e.target.getAttribute('data-group')}"]`).forEach((el, index) => {
      el.classList.remove('active')
    })

    // close all tab page
    this.closeTabPanes(e.target)

    this.__targetPanes.forEach((el, index) => {
      el.classList.add('active')

      return e.target.callback.onactive ? e.target.callback.onactive(e.target, el, this) : ''
    })
    // set the handle to active state
    e.target.classList.add('active')
  }

  closeTabPanes (targetElements) {
    const targetPanes = document.querySelectorAll(`.tab-pane[data-group="${targetElements.getAttribute('data-group')}"]`)
    // close all panes except the active one
    targetPanes.forEach((el, index) => {
      el.classList.remove('active')
    })
  }

  tab (callback = {}) {
    this.__bindHandles(callback)
    return this
  }
}
