export default class {
  constructor (opt) {
    this.opt = opt
  }
  async getRecordsPerVehicleAndDate(opt) {
    this.xhr = new (await import('../../../utils/xhr')).default()
    return this.xhr.getData(`automobile/${opt.id}/records/time/${opt.date}`)
  }
}