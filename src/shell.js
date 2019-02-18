/* eslint-disable new-cap */
import { URL } from './config/app'

const Navigo = import('navigo')


const loadHeader = (opt) => {
  const __header = import('./components/main-header')
  __header.then(Res => {
    const __target = document.querySelector('header')
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadSidebar = (opt) => {
  const __sidebar = import('./components/main-sidebar')
  const __target = document.querySelector('.main-sidebar')
  __sidebar.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadCookieSection = (opt) => {
  const __cookie = import('./components/cookie-notice-section')
  const __target = document.querySelector('.cookie-section')
  __cookie.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.append(html)
    })
  })
}

const loadMain = (opt = {}) => {
  loadHeader(opt)
  loadSidebar(opt)
  loadCookieSection(opt)

  let token = window.localStorage.getItem('adal.access.token.keyhttps://graph.microsoft.com')

  // get image from server if not exists
  if (opt.image) return
  getImage(token).then(res => {
    res.blob().then(blob => {
      // reader
      let reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        Profiler.then(prof => {
          let p = new prof.default()
          if (reader.result.indexOf('data:image') !== -1) {
            // check for valid image
            let data = { ...p.get(), image: reader.result }
            // save image
            p.set(data)
            // reload header
            loadHeader(opt)
          }
        })
      }
    })
  })

  document.querySelector('.wrapper').classList.remove('hidden')
  let loginContainer = document.querySelector('.loginContainer')
  if (loginContainer) loginContainer.remove()
}


const loadHomePage = (opt = {}) => { 
  const __page = import('./pages/home-page')
  const __target = document.querySelector('.home-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => { 
      return __target ? __target.replaceWith(html) : document.querySelector('.ajax-main-section').prepend(html)
    })
  })
}

const getImage = (token) => {
  // https://graph.microsoft.com/v1.0/me/photo/$value
  return window.fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    headers: { 'Authorization': 'Bearer ' + token },
    method: 'GET'
  })
}

let profile = {}
const loadRoutes = () => {
  Navigo.then(routerClass => {
    const router = new routerClass.default(URL.fullPath, true)
    router.on({
      '': async () => {
        loadLoginPage()
      },
      '/login/*': () => {
        import('./routers/auth')
      },
      '/signout': () => {

      },
      '/home': () => { 
        let profile = {}
        loadMain(profile)
        loadHomePage()
      },
      '/vehicle/*': () => {
        import('./routers/vehicle')
      },
      '/vehicle': () => {
        loadMain(profile)
        import('./routers/vehicle')
      },
    }).resolve()
  })
}
loadRoutes()
// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
