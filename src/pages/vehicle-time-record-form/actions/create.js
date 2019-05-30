/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor (opt) {
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__opt = opt
    this.__headers = { 'Authorization': `Bearer ${window.localStorage.getItem('cwp.access_token')}` }
    return this.render()
  }

  async create (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.postData(`automobile/records/time`, opt, headers, false)
  }

  async update (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.putData(`automobile/records/time/${this.__opt.id}`, opt, headers, false)
  }

  fail () {
    const targ = document.querySelector('#general-modal > .content > .body')
    targ.innerHTML = `
      <h4 class="text-danger">Oops! Something went wrong</h4>
      <p class="text-muted">Please try again later</p>
    `
  }


  success () { 
    const targ = document.querySelector('#general-modal > .content > .body')
    targ.innerHTML = `
      <h4 class="text-success">Saved successfully!</h4>
      <p class="text-muted">This notification will close automatically after 10 seconds</p>
    `
    setTimeout(() => document.querySelector('#general-modal').close() , 10000)
  }

  __save (e) { 
    e.target.disabled = 'disabled'
    const today = new Date()
    const now = (`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`)
    const date = this.__opt.root.querySelector('#date').value || now
    const time = this.__opt.root.querySelector('#time').value || (`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
    const mode = this.__opt.root.querySelector('#mode').value
    const mileage = this.__opt.root.querySelector('#mileage').value
    const tt_number = this.__opt.root.querySelector('#tt_number').value
    const driver_id = this.__opt.root.querySelector('#driver_id').getAttribute('data-list-value') ? null : this.__opt.root.querySelector('#driver_id').value
    const vehicle_id = this.__opt.root.querySelector('#vehicle_id').getAttribute('data-list-value') ? null : this.__opt.root.querySelector('#vehicle_id').value
    const plate_no = this.__opt.root.querySelector('#vehicle_id').getAttribute('data-list-value') || null
    const remarks = this.__opt.root.querySelector('#remarks').value
    const guard_id = 1


    let query = ''
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Authorization': this.__headers.Authorization
    }

    let payload = {
      date,
      time,
      mode,
      mileage,
      tt_number,
      driver_id,
      drivers_name : driver_id ? null : this.__opt.root.querySelector('#driver_id').getAttribute('data-list-value'),
      vehicle_id,
      guard_id,
      plate_no,
      remarks
    }

    for (let key in payload) {
      query += encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]) + '&'
    }

    // CREATE
    if (!this.__opt.id) {
      document.querySelector('#general-modal > .content > .body').innerHTML = '<p class="text-muted">Saving. . . Please wait</p><br/><br/>'
      this.create(query, headers, false).then(res => {
        if(!res.id) this.fail()
        this.__opt.root.querySelector(this.__opt.target).reset()
        this.success ()
      }).catch(e => console.log(e) | this.fail())
    } else {
      // UPDATE
      payload.id = this.__opt.id
      this.update(query, headers, false).then(res => {
        if(!res.status) return this.fail()
        this.success ()
      })
    }

    
    
    
  }

  __load () {
    document.querySelector('#general-modal').show()
    const targ = document.querySelector('#general-modal > .content > .body')
    const __proto__ = Object.create(this)
    targ.innerHTML = `<center style="line-height: 0px;">
        <h4>Are you sure you want to continue ?</h4>
        <p class="text-muted">Please check all the fields before you proceed</p>
        <br/><br/>
        <div class="row btn-form">
        <div class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-close-button">
          <p>NO</p>
        </div>
        <button class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-add-button">
          <p>YES</p>
        </button>
      </div>`

    // close button
    targ.querySelector('#modal-dialog-close-button').addEventListener('click', document.querySelector('#general-modal').close)

    // remove button
    targ.querySelector('#modal-dialog-add-button').addEventListener('click', this.__save.bind(this))

  }

  bind () {
    const __proto__ = Object.create(this)
    this.__opt.root = this.__opt.root || document
    this.__opt.root.querySelector(this.__opt.target).addEventListener('submit', this.__load.bind(__proto__))
  }

  render () {
    this.bind()
  }
}
