import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  generateDateFields () {
    let d = '';
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((x, i) => {
      d += `<li><a>${x} 2019</a></li>`
    })

    return d
  }

  __bindListener () {
  }

  async render () {
    this.__template = document.createElement('article')
    this.__template.classList.add('vehicle-time-record-table', 'col', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12')
    this.__dateFields = this.generateDateFields()
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <br/><br/>
    <div class="col col-lg-3 col-md-3 col-sm-3">
      <h3>5 April 2019</h3>
    </div>

    <div class="col col-lg-3 col-md-3 col-xs-12 pull-right" style="padding-top: 20px;">
      <input type="text" class="form-control" placeholder="SEARCH"/>
    </div>

    <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

    <div class="col col-lg-12 col-xs-12 col-sm-12 col-md-12">
      <table class="table" style="font-size: 1em;">
        <thead>
          <tr>
            <th width="10%">OUT</th>
            <th width="10%">IN</th>
            <th width="10%">TRIP TICKET(TT#)</th>
            <th width="20%">DRIVER</th>
            <th width="20%">GUARD ON DUTY</th>
            <th>REMARKS</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7:00 AM</td>
            <td>9:00 AM</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>Jane Hey</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis</td>
            <td class="text-center">
              <a href="#"><i class="fa fa-chevron-down"></i></a>
            </td>
          </tr>

          <tr>
            <td>7:00 AM</td>
            <td>9:00 AM</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>Jane Hey</td>
            <td></td>
            <td class="text-center">
              <a href="#"><i class="fa fa-chevron-down"></i></a>
            </td>
          </tr>                <tr>
          <td>7:00 AM</td>
          <td>9:00 AM</td>
          <td>1234</td>
          <td>John Doe</td>
          <td>Jane Hey</td>
          <td></td>
          <td class="text-center">
            <a href="#"><i class="fa fa-chevron-down"></i></a>
          </td>
        </tr>

        </tbody>
      </table>
    </div>`
    this.__bindListener()
    return this.__template
  }
}
