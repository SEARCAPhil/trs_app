/* eslint-disable new-cap */
import { URL } from './config/app'
import Message from 'vanilla-antd-message/dist/'

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


const hideHomePage = () => {
  let targ = document.querySelector('.home-section')
  if (targ) targ.parentNode.removeChild(targ)
}

const loadMain = (opt = {}) => {
  loadHeader(opt)
  loadSidebar(opt)
  loadCookieSection(opt)
  hideHomePage()

  let token = window.localStorage.getItem('adal.access.token.keyhttps://graph.microsoft.com')

  // get image from server if not exists
  if (opt.image) return
  getImage(token).then(res => {
    res.blob().then(blob => {
      // reader
      let reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        /* Profiler.then(prof => {
          let p = new prof.default()
          if (reader.result.indexOf('data:image') !== -1) {
            // check for valid image
            let data = { ...p.get(), image: reader.result }
            // save image
            p.set(data)
            // reload header
            loadHeader(opt)
          }
        }) */
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
        // loadLoginPage()
        window.location.hash = '/home'
      },
      '/login': () => {
        import('./routers/auth')
      },
      '/login/*': () => {
        import('./routers/auth')
      },
      '/signout': () => {
        document.querySelector('.wrapper').innerHTML = ''   
        window.location.hash = '/login'
      },
      '/home': () => {
        let profile = {}
        // empty section
        document.querySelector('.ajax-main-section').innerHTML = ''
        loadMain(profile)
        loadHomePage()
      },
      '/vehicle/*': () => {
        loadMain(profile)
        import('./routers/vehicle/')
      },
      '/vehicle': () => {
        loadMain(profile)
        import('./routers/vehicle/')
      }
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


  // on update
  // eeeeeee
  navigator.serviceWorker.controller.onstatechange = function (event) {
    if (event.target.state === 'redundant') {

      if ('controller' in navigator.serviceWorker) {
        import('vanilla-antd-message/dist/style.css').then(res => { 
          // update notice style
          let style = document.createElement('style')
          style.innerHTML = `${res.default.toString()}`
          style.async = true  
          document.body.append(style)
        })
        // show message then restart the app
        Message.success('A new update is available! To bring the most out of it, we will now restart your application', 20000)
        setTimeout(() => { 
          window.location.reload()
        }, 3000)
      }
    
    }
  }
}

