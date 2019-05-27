
export default class {
  async getAutomobile(opt = {}) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    return this.xhr.getData(`automobile?page=${opt.page || 1}`)
  }

  async search(opt = {}) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    return this.xhr.getData(`automobile/search/${opt.param}?page=${opt.page ? opt.page : 1}`)
  }
}