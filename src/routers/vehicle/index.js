/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadVehiclePage = (opt = {}) => {
  const __page = import('../../pages/vehicle-page')
  const __target = document.querySelector('.vehicle-section')
  const __ajaxSection = document.querySelector('.ajax-main-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : ((__ajaxSection.innerHTML = '') | __ajaxSection.prepend(html))
    })
  })
}

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/vehicle': async () => {
      loadVehiclePage()
    },
    '/vehicle/forms/time': (opt) => {
      import('./forms/time')
    },
    '/vehicle/:id/profile': (opt) => {
      import('./profile')
    },
    '/vehicle/:id/time': (opt) => {
      import('./time')
    }

  }).resolve()
})
