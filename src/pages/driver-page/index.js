/* eslint-disable new-cap */
import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  __bindSearch () { console.log(document.querySelector('.vehicle-search-box:not(.event-binded)'))
  document.querySelector('.vehicle-search-box:not(.event-binded)').addEventListener('keyup', (e) => {
    e.target.classList.add('event-binded')
    const input = e.target
    if (!input.value.length) this.__bindListeners()
    if (input.value.length < 3) return clearTimeout(this.__timeout)

    clearTimeout(this.__timeout)
    this.__timeout = setTimeout(() => {
      this.__search(input.value)
    }, 1000)
  })
}

  __search (param) {
    // show loading
    const container = this.__template.querySelector('.car-box-container ')
    container.innerHTML = 'Loading results . . .'
    //search
    import('./actions/list').then(comp => {
      const lists = new comp.default ()
      const urlParams = new URLSearchParams(window.location.href.substring(window.location.href.indexOf('?')))

      lists.search ({page: urlParams.get('page'), param}).then(res => {
        // empty page then load search results
        container.innerHTML = ''
        res.data.forEach(el => {
          this.loadVehicleItems(el)
        })

        // total count
        this.__template.querySelector('.current_count').innerText = res.to
        this.__template.querySelector('.total_count').innerText = res.total

        // show pagination
        this.__pager(res.first_page_url, res.last_page)

        // page
        let pagerBox = document.querySelector('.pager-boxes')
        pagerBox.innerHTML = ''
        pagerBox.append(this.__createPageNav(res.last_page, res.current_page))


      })
    })
  }


  __goToPage (page) {
    window.location.hash = `/vehicle?page=${page}`
  }

  __pager (firstPage, lastPage) {
    let html = document.createElement('div')
    html.classList.add('col-lg-12', 'col-xs-12', 'col-sm-12')
    let targ = this.__template.querySelector('.car-box-pager-container')
    html.innerHTML = ` <span class="btn btn-xs btn-default contact-first-page">&laquo&laquo</span>
    <span class="pager-boxes"></span>
    <span class="btn btn-xs btn-default contact-last-page">&raquo&raquo</span>`

    // Go to first page
    html.querySelector('.contact-first-page').addEventListener('click', () => {
      this.__goToPage(1)
    })

    // Go to last page
    html.querySelector('.contact-last-page').addEventListener('click', () => {
      this.__goToPage(lastPage)
    })
    targ.innerHTML = ''
    targ.append(html)
  }

  __createPageNav (treshold, currentPage = 1) {
    let pager = document.createElement('span')
    for (let x = 1; x <= treshold; x++) {
      let span = document.createElement('span')
      span.classList.add('btn', 'btn-xs', 'btn-default', 'contact-last-page', (currentPage === x ? 'active' : 'not-active'))
      span.style.marginRight = '3px'
      span.innerHTML = x
      // navigate to page
      span.addEventListener('click', () => {
        this.__goToPage(x)
      })
      pager.append(span)
    }
    return pager
  }

  async __bindListeners (opt = {}) {
    // this.__bindChart ()
    this.loadMenuSection().then(() => {
      this.__bindSearch()
    })
    

    //set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'driver')

    import('./actions/list').then(comp => {
      const lists = new comp.default ()
      const urlParams = new URLSearchParams(window.location.href.substring(window.location.href.indexOf('?')))

      lists.getAutomobile ({page: urlParams.get('page')}).then(res => {
        res.data.forEach(el => {
          this.loadItems(el)
        })

        // total count
        this.__template.querySelector('.current_count').innerText = res.to
        this.__template.querySelector('.total_count').innerText = res.total

        // show pagination
        this.__pager(res.first_page_url, res.last_page)
        // page
        let pagerBox = document.querySelector('.pager-boxes')
        pagerBox.innerHTML = ''
        pagerBox.append(this.__createPageNav(res.last_page, res.current_page))


      })
    })
  }

  loadMenuSection (opt) {
    const __menu = import('../../components/driver-list-menu')
    const __target = this.__template.querySelector('.driver-list-menu') || this.__template.querySelector('driver-list-menu')
    return new Promise((resolve, reject) => {
      __menu.then(Res => {
        return new Res.default(opt).then(html => {
          resolve()
          return __target ? __target.replaceWith(html) : null
        }).catch(e => reject(e))
      })
    })
  }

  loadItems (opt) {
    const __menu = import('../../components/driver-list-item')
    const __target = this.__template.querySelector('.box-container')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        __target.append(html)
      })
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section')
    this.__template.innerHTML = `
      <style>${style.toString()}</style>
      <driver-list-menu></driver-list-menu>
      <article class="col col-lg-12 col-md-12 col-xs-12 col-sm-12" style="margin-top:50px;">
        <section class="box-container box col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="box-header with-border">
            <h3>SEARCA's list of drivers</h3>
            <i class="fa fa-info-circle text-info"></i> Click the item to see their full information
            <div class="box-tools pull-right">
              <section class="badge"><span class="current_count">0</span> out of <span class="total_count">0</span></section>
            </div>
          </div>
        </section>
      </article>
      <article class="car-box-pager-container col-lg-12 col-sm-12 col-md-12"></article>`
    this.__bindListeners()
    return this.__template
  }
}
