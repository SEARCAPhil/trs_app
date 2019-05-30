export default class {
  constructor (opt) {
    this.opt = opt
  }
  async getDetails(opt) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    return this.xhr.getData(`account/driver/${this.opt.id}/profile`)
  }
}