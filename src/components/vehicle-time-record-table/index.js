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
    this.__template.classList.add('vehicle-time-record-table', 'col', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12', 'box')
    this.__dateFields = this.generateDateFields()
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <div class="col col-lg-3 col-md-3 col-sm-3">
      <h3>5 April 2019</h3>
    </div>

    <div class="col col-lg-3 col-md-3 col-xs-12 pull-right" style="padding-top: 20px;">
      <input type="text" class="form-control" placeholder="SEARCH"/>
    </div>

      <div class="col col-md-12 col-sm-12">
        <vehicle-time-record-menu>
          <ul class="nav navbar-nav">
            <li>
              <select class="form-control">
                <option>Show All</option>
                <option>With Trip Ticket Only</option>
              </select>
            </li>
            <li>
            <select class="form-control">
              <option>No Filter</option>
              <option>By Driver</option>
              <option>By Guard</option>
              <option>By Department</option>
            </select>
          </li>
          <li>
            <input list="filter_input" class="form-control" id="filter_input_field" required="" autocomplete="off" data-list-value="" value="">
            <datalist id="filter_input">
              <option value="1">Honda Accord 3.5 S. AT(OEV-26782)</option>
            </datalist>
          </li>
          <li>
            <button class="btn btn-success">Filter</button>
          </li>
        </ul>
      </vehicle-time-record-menu>
    </div>

    <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr/></div>

    <div class="col col-lg-12 col-xs-12 col-sm-12 col-md-12">
      <table class="table table-bordered table-striped dataTable" style="font-size: 1em;">
        <thead>
          <tr>
            <th width="10%">OUT</th>
            <th width="10%">IN</th>
            <th width="10%" class="text-center">TRIP TICKET(TT#)</th>
            <th width="10%" class="text-center">MILEAGE<br/>OUT</th>
            <th width="10%" class="text-center">MILEAGE<br/>IN</th>
            <th width="10%">DRIVER</th>
            <th width="10%" class="text-center">GUARD ON DUTY</th>
            <th width="10%">DEPARTMENT</th>
            <th>REMARKS</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7:00 AM</td>
            <td>9:00 AM</td>
            <td>1234</td>
            <td>1234</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>Jane Hey</td>
            <td>GSU</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
            <td class="text-center">
              <a href="#"><i class="fa fa-chevron-down"></i></a>
            </td>
          </tr>
            <tr>
            <td>7:00 AM</td>
            <td>9:00 AM</td>
            <td>1234</td>
            <td>1234</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>Jane Hey</td>
            <td>GSU</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis</td>
            <td class="text-center">
              <a href="#"><i class="fa fa-chevron-down"></i></a>
            </td>
          </tr>
          <tr>
            <td>7:00 AM</td>
            <td>9:00 AM</td>
            <td>1234</td>
            <td>1234</td>
            <td>1234</td>
            <td>John Doe</td>
            <td>Jane Hey</td>
            <td>GSU</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis</td>
            <td class="text-center">
              <a href="#"><i class="fa fa-chevron-down"></i></a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="col-sm-5">
          <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
        </div>
        <div class="col-sm-7">
          <div class="dataTables_paginate paging_simple_numbers pull-right" id="example2_paginate">
            <ul class="pagination">
              <li class="paginate_button previous disabled" id="example2_previous">
                <a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0">Previous</a>
              </li>
              <li class="paginate_button active">
                <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0">1</a>
              </li>
              <li class="paginate_button ">
                <a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0">2</a>
              </li>
              <li class="paginate_button ">
                <a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0">3</a>
              </li>
              <li class="paginate_button ">
                <a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0">4</a>
              </li>
              <li class="paginate_button ">
                <a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0">5</a>
              </li>
              <li class="paginate_button ">
                <a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0">6</a>
              </li>
              <li class="paginate_button next" id="example2_next">
                <a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
    this.__bindListener()
    return this.__template
  }
}
