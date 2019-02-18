/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadLoginPage = (mode = 'o365') => {
  document.querySelector('.wrapper').classList.add('hidden')
  const loginContainer = document.createElement('main')
  loginContainer.classList.add('loginContainer')

  // hide other section
  let header = document.querySelector('.main-header')
  let sidebar = document.querySelector('.main-sidebar')
  if (header) header.classList.add('hidden')
  if (sidebar) sidebar.classList.add('hidden')
  
  // import office 365 or standard login section
  let page = mode === 'o365' ? import('../pages/login-page') : import('../pages/login-page-typical')
  page.then(res => {
    return new res.default().then(html => {
      loginContainer.innerHTML = ''
      loginContainer.append(html)
      if (!document.querySelector('.loginContainer')) document.body.append(loginContainer)
      document.querySelector('.loginContainer').replaceWith(loginContainer)
    })
  })
}



Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/login/o365': async () => {
      loadLoginPage()
    },
    '/login/corporate': async () => {
      loadLoginPage('typical')
    }
  }).resolve()
})
