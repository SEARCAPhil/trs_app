/* eslint-disable new-cap */
import { Middleware } from '../mixins/middleware'
const Profiler = import('../mixins/profiler')

export default class {
  constructor () {
    this.error = 'Unauthenticated'
    return new Middleware().set('Auth', this.render)
  }

  async render () {
    const data = await Profiler.then(res => {
      this.data = (new res.default().get())
      this.__acces_token = (new res.default().getAccessToken())
      return (typeof this.data.id === 'undefined' || typeof this.__acces_token === 'undefined') ? 0 : 1
    }).catch(() => { return 0 })

    return data
  }
}
