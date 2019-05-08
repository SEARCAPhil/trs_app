/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadVehicleTimeRecordPage = (opt = {}) => {
  const __page = import('../../pages/vehicle-time-record')
  const __target = document.querySelector('.vehicle-time-record-form-page')
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
    '/vehicle/:id/time': async (opt) => {
      loadVehicleTimeRecordPage(opt)
    }
  }).resolve()
})
