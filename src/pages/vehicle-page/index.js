import style from './style'
import logo from './assets/img/car-logo.png'
import wigo from './assets/img/wigo.png'





export default class {
  constructor () {
    return this.render()
  }

  __bindChart () {
    const highCharts = import('highcharts')
    highCharts.then(res => {
      const Highcharts = res.default
      Highcharts.chart(this.__template.querySelector('#service-chart-container'), {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Useful Life'
        },
        subtitle: {
          text: '<br/><small>Maximum of 15 years</small>'
        },
        series: [{
            name: 'Utilized years',
            data: [1, 0, 4],
            dataLabels: {
              formatter: function () {
                  return this.y > 5 ? this.point.name : null;
              },
              color: '#ffffff',
              distance: -30
          }
        }]
      })
      
    })
  }

  __bindListeners () {
    this.__bindChart()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section')
    this.__template.innerHTML =   `
      <style>${style.toString()}</style>
      <article class="home-section-text">
        <div class="col col-lg-12">
          <div class="media">
            <div class="media-left">
              <img src="${logo}" class="media-object" style="width:100px">
            </div>
            <div class="media-body">
              <h4 class="media-heading">Automobile List</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Proin erat sapien, ultrices a egestas sed, pellentesque pretium lectus. <br/>
                Fusce volutpat ante in tortor cursus euismod. 
                Praesent et fringilla felis.
              </p><br/>
            </div>
          </div>
        </div>

        <div class="col col-sm-12 col-lg-4">
          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>

          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>
          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>
          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>
          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>
          <section class="box car-box-container" style="border-top: none !important;">
            <div class="car-box">
              <div>
                <a href="#" class="pull-right"><i class="fa fa-gear"></i></a>
              </div>
              <div>
              <img src="${wigo}" class="media-object" style="width:100%">
              </div>
              <div>
                <p><h4>Toyota Wigo</h4>
                Plate No. <b>ABC-123</b><br/>
                2014 Model</p>
              </div>
            </div>
          </section>
        </div>

        <div class="col col-lg-8">
          <section class="box" style="padding: 10px;">
              <center>
                <br/><br/>
                <img src="${wigo}" class="media-object" style="width:300px;">
                <h4>Toyota Innova</h4>
                Plate No. ABC-1234<br/>
                2014 Model<br/>
              </center>
          </section>
          <section class="col col-12">
            <p class="pull-right text-muted">View all Info</p>
          </section>

          <section class="box">
            <div class="row">
              <div class="col col-lg-6 col-xs-6">
                <div class="col col-lg-12" style="padding: 10px;">
                  <p class="text-muted">ACQUISITION</p>
                  January 21, 2019
                  <br/><br/>
                  <p class="text-muted">PLATE NUMBER</p>
                  ABC-123
                </div>
              </div>
              <div class="col col-lg-6 col-xs-6">
                <div id="service-chart-container" style="width:100%; height:200px;"></div>
              </div>
            </div>
          </section>


          <section class="box">
            <div class="row">
              <div class="col col-lg-12">
                <div class="col col-lg-1 col-xs-2 text-center"  style="padding: 10px;font-size:1.5em;"><i class="fa fa-gas-pump"></i></div>
                <div class="col col-lg-10 col-xs-9" style="padding: 10px;border-bottom: 1px solid rgba(200,200,200,0.5);"><a href="#">Gasoline</a></div>
                <div class="col col-lg-1 col-xs-1 text-center"  style="padding: 10px;"><i class="fa fa-chevron-right"></i></div>
              </div>

              <div class="col col-lg-12">
                <div class="col col-lg-1  col-xs-2 text-center"  style="padding: 10px;font-size:1.5em;"><i class="fa fa-toolbox"></i></div>
                <div class="col col-lg-10 col-xs-9" style="padding: 10px;border-bottom: 1px solid rgba(200,200,200,0.5);">Repair and Maintenance</div>
                <div class="col col-lg-1 col-xs-1 text-center"  style="padding: 10px;"><i class="fa fa-chevron-right"></i></div>
              </div>

              <div class="col col-lg-12">
                <div class="col col-lg-1  col-xs-2 text-center"  style="padding: 10px;font-size:1.5em;"><i class="fa fa-burn"></i></div>
                <div class="col col-lg-10 col-xs-9" style="padding: 10px;border-bottom: 1px solid rgba(200,200,200,0.5);">Oil</div>
                <div class="col col-lg-1 col-xs-1 text-center"  style="padding: 10px;"><i class="fa fa-chevron-right"></i></div>
              </div>

              <div class="col col-lg-12">
                <div class="col col-lg-1  col-xs-2 text-center"  style="padding: 10px;font-size:1.5em;"><i class="fa fa-clock"></i></div>
                <div class="col col-lg-10 col-xs-9" style="padding: 10px;">Time Records</div>
                <div class="col col-lg-1 col-xs-1 text-center"  style="padding: 10px;"><i class="fa fa-chevron-right"></i></div>
              </div>

            </div>
          </section>

      
        </div>
      </article>
    `
    this.__bindListeners()
    return this.__template
  }
}