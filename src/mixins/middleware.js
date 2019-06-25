export class Middleware {
  constructor () {
    if (!Middleware.instance) Middleware.instance = this
    this.middlewares = []
    this.a = []
    return Middleware.instance
  }

  set (name, callback) {
    this.middlewares[name] = callback
    return this
  }

  merge (middlewares = []) {
    return Promise.all(middlewares)
  }

  async run (names = []) {
    let response = {}
    return new Promise(async (resolve, reject) => {
      names.forEach(async (el, index) => {
        let callbackResult = this.middlewares[el]()
        // PROMISE
        response[el] = callbackResult.then ? await callbackResult : callbackResult
        // ALL callbacks must passed otherwise middleware will
        // return a rejected promise
        let isPassed = 1
        for (let x in response) {
          isPassed = isPassed / response[x]
          if ((!isPassed) || isPassed === Infinity) return reject(new Error('One of the Middlewares failed!'))
          resolve(isPassed)
        }
      })
    })
  }
}
