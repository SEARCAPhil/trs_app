import style from './style'

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
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
            text: 'Useful Life'
        },
        subtitle: {
          text: '<br/><small>Maximum of 15 years</small>'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
      },credits: {
        enabled: false
      },
        series: [{
            name: 'Utilized years',
            colorByPoint: true,
            data: [{
              name: 'In service',
              y: 1,
              sliced: true,
              selected: true
            },
            {
              name: 'remaining',
              y: 15,
              
            }
          ],
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
    //this.__bindChart ()
    this.loadMenuSection ()
    // mock vehicles
    for(let x = 0; x < 5; x++) { this.loadVehicleItems ({id: x}) }

    
  }

  loadMenuSection (opt) {
    const __menu = import('../../components/vehicle-list-menu')
    const __target = this.__template.querySelector('.vehicle-list-menu') || this.__template.querySelector('vehicle-list-menu')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  loadVehicleItems (opt) {
    const __menu = import('../../components/vehicle-list-item')
    const __target = this.__template.querySelector('.car-box-container')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        __target.append(html)
      })
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section', 'row')
    this.__template.innerHTML =   `
      <style>${style.toString()}</style>
      <vehicle-list-menu></vehicle-list-menu>
      <article class="col col-lg-12 col-md-12">
        <section class="col col-lg-12" style="padding: 20px;margin:20px 20px;">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> 
            Proin erat sapien, ultrices a egestas sed, pellentesque pretium lectus.<br/> 
            Fusce volutpat ante in tortor cursus euismod. Praesent et fringilla felis. 
            <button class="btn btn-sm btn-primary">New</button>
          </p>
        </section>
      </article>
      <article class="car-box-container col-lg-12"></article>`
    this.__bindListeners()
    return this.__template
  }
}