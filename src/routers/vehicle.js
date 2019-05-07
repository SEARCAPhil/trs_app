/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadVehiclePage = (opt = {}) => { 
  const __page = import('../pages/vehicle-page')
  const __target = document.querySelector('.vehicle-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => { 
      return __target ? __target.replaceWith(html) : document.querySelector('.ajax-main-section').prepend(html)
    })
  })
}

const loadVehicleProfilePage = (opt = {}) => { 
  const __page = import('../pages/vehicle-profile')
  const __target = document.querySelector('.vehicle-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => { 
      return __target ? __target.replaceWith(html) : document.querySelector('.ajax-main-section').prepend(html)
    })
  })
}


Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/vehicle': async () => {
      loadVehiclePage ()
    },
    '/vehicle/:id/profile': async (opt) => {
      loadVehicleProfilePage ()
    },
    '/vehicle/form': async () => {

    }
  }).resolve()
})
