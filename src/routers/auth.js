/* eslint-disable new-cap */
const Navigo = import('navigo')

const loadLoginPage = () => {
  
  const loginContainer = document.createElement('main')
  const header = document.querySelector('.main-header')
  const sidebar = document.querySelector('.main-sidebar')
  loginContainer.classList.add('loginContainer')
  document.querySelector('.wrapper').classList.add('hidden')

  if(header) header.remove ()
  if(sidebar) sidebar.remove ()
  // import office 365 or standard login section
  let page = import('../pages/login-page-default') 
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
    '/login/corporate': async () => {
      loadLoginPage ()
    },
    '/login': async () => { 
      loadLoginPage ()
    }
  }).resolve()
})
