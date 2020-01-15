/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadPage = (opt = {}) => {
  const __page = import('../../pages/gasoline-page')
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
    '/gasoline': async () => {
      loadPage()
    },
    '/gasoline/:id/profile': async () => {
      import('./profile')
    }
  }).resolve()
})
