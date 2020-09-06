const template = ({
  title = '',
  image = './assets/recipie-placeholder.png',
  subtitle = '',
  userPicture = './assets/profile-placeholder.jpg',
  stars = 0,
  userName = ''
} = {}) => {
  return /* html */`
  <div class="card" style="box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);">
    <img src="${image}" class="card-img-top" />
    <div class="card-body px-2 py-3">
      <div class="row">
        <div class="col-8">
          <p class="card-title font-weight-bold mb-0" style="font-size: 20px">${title}</p>
          <p class="card-text font-weight-light" style="font-size: 15px">${subtitle}</p>
        </div>
        <div class="col-4 p-0">
          <div class="row d-flex justify-content-center align-items-center">
            <i class="fas fa-star mr-2" style="color: var(--yellow); font-size: 24px"></i>
            <p class="card-text font-weight-light" style="font-size: 15px">${stars}</p>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-4">
          <img src="${userPicture}" class="rounded-circle" style="max-width: 59px" />
        </div>
        <div class="col-8 pl-0 d-flex-row m-auto">
          <p class="card-title font-weight-light mb-0" style="font-size: 15px; color: var(--red);">Submited by:</p>
          <p class="card-title font-weight-bold mb-0" style="font-size: 15px; color: var(--red);">${userName}</p>
        </div>
      </div>
    </div>
  </div>
  `
}

class RecipieCard extends HTMLElement {
  constructor () {
    super()
    // define props
    const props = ['picture', 'title', 'subtitle', 'stars', 'userPicture', 'userName']

    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    // Attach stuff to shadow DOM
    this.innerHTML = template(templateProps)
  }
}

window.customElements.define('recipie-card', RecipieCard)
