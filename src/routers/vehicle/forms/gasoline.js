/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadVehicleTimeRecordPage = (opt = {}) => {
  const __page = import('../../../pages/vehicle-gasoline-form')
  const __target = document.querySelector('.vehicle-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : ((document.querySelector('.ajax-main-section').innerHTML = '') | document.querySelector('.ajax-main-section').prepend(html))
    })
  })
}

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/vehicle/forms/gasoline': async () => {
      loadVehicleTimeRecordPage()
    },
    '/vehicle/forms/gasoline/:id/update':  (param) => { 
      loadVehicleTimeRecordPage(param)
    }
  }).resolve()
})
