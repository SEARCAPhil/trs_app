import style from './style'

export default class {
  constructor () {
    return this.render()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('home-section')
    this.__template.innerHTML =   `
      <style>${style.toString()}</style>
      <div class="home-section-text">
        <div class="col col-lg-12">
          <div class="media">
            <div class="media-left">
              <img src="img_avatar1.png" class="media-object" style="width:60px">
            </div>
            <div class="media-body">
              <h4 class="media-heading">Automobile List</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Proin erat sapien, ultrices a egestas sed, pellentesque pretium lectus. <br/>
                Fusce volutpat ante in tortor cursus euismod. 
                Praesent et fringilla felis.
              </p>
            </div>
          </div>
        </div>

        <div class="col col-sm-12">
          <div class="box" style="border-top: none !important;">
            list-section here
          </div>
        </div>
      </div>
    `
    return this.__template
  }
}