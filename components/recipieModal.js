const recipieModalDefaultData = {
  images: [
    './assets/img/carousel-placeholder.jpg',
    './assets/img/carousel-placeholder.jpg'
  ],
  user: {
    name: '',
    picture: './assets/img/profile-placeholder.jpg'
  },
  recipie: {
    title: '',
    stars: 0,
    steps: ['This recipie has no instructions.'],
    ingredients: [{
      ingredient: 'This recipie has no ingredients',
      amount: 0,
      unit: ''
    }]
  }
}

class RecipieModal extends HTMLElement {
  static get observedAttributes () {
    return ['data']
  }

  constructor () {
    super()
    const data = JSON.parse(this.getAttribute('data'))
    this.data = data || recipieModalDefaultData
    this.innerHTML = this.render()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    newValue = JSON.parse(newValue) || recipieModalDefaultData
    this[name] = newValue
    this.render()
  }

  carousel () {
    let indicator = ''
    let imageContainer = ''

    const { images = recipieModalDefaultData.images } = this.data

    images.forEach((image, index) => {
      const isActive = index === 0 ? 'active' : ''
      indicator += /* html */`
        <li data-target="#recipieCarousel" data-slide-to="0" class="${isActive}">
        </li>
      `
      imageContainer += /* html */`
        <div class="carousel-item ${isActive} p-0">
          <img class="d-block responsive-image" style="object-fit: cover;" src="${image}">
        </div>
      `
    })

    return /* html */ `
      <div id="recipieCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          ${indicator}
        </ol>
        <div class="carousel-inner rounded mb-3" style="max-height: 50vh">
          ${imageContainer}
        </div>
        <a class="carousel-control-prev" href="#recipieCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#recipieCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    `
  }

  instructions () {
    let finalInstructions = ''
    const { steps = recipieModalDefaultData.recipie.steps } = this.data
    steps.forEach(step => {
      finalInstructions += /* html */`
        <p class="font-weight-bold" style="font-size: 14px">
          ${step}
        </p>
      `
    })
    return finalInstructions
  }

  ingredients () {
    let finalIngredients = ''
    const { ingredients = recipieModalDefaultData.recipie.ingredients } = this.data
    ingredients.forEach(({ unit, ingredient, amount }) => {
      finalIngredients += /* html */`
        <p style="font-size: 14px">
          <span style="color: var(--green)">${amount} ${unit}</span> ${ingredient}
        </p>
      `
    })
    return finalIngredients
  }

  render () {
    const { user = { ...recipieModalDefaultData.user }, recipie = recipieModalDefaultData.recipie } = this.data

    return /* html */`
      <div class='modal fade p-0' id='recipieModal' tabindex='-1' role='dialog' aria-hidden='true'>
        <div class='modal-dialog mx-auto my-4' role='document' style="max-width: 90vw">
          <div class='modal-content'>
            <div class='modal-body p-0'>
              <div class="row w-100 m-0">
                <div class="col p-0 bg-white">
                  <button type='button' class='close position-absolute modal-close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                  ${this.carousel()}
                </div>
              </div>
              <div class="row w-100 m-0" style="box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);">
                <div class="col-12 order-2 col-md-4 order-md-1 mb-2 d-flex align-items-center justify-content-center">
                  <div class="row p-3 w-100">
                    <div class="col d-flex justify-content-end">
                      <img src="${user.picture}" class="rounded-circle" style="max-width: 59px" />
                    </div>
                    <div class="col p-0 d-flex flex-column justify-content-center">
                      <p class="card-title font-weight-light mb-0" style="font-size: 15px; color: var(--red);">Submited by:</p>
                      <p class="card-title font-weight-bold mb-0" style="font-size: 15px; color: var(--red);">
                        ${user.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12 order-1 col-md-4 order-md-2 mb-2 d-flex align-items-center justify-content-center">
                  <h4 class="font-weight-bold text-break" style="color: var(--red)">${recipie.title}</h4>
                </div>
                <div class="col-12 order-3 col-md-4 order-md-3 mb-2 d-flex flex-column justify-content-center align-items-center">
                  <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                      <i class="fas fa-star mr-2" style="color: var(--yellow); font-size: 24px"></i>
                      <p class="card-text font-weight-light" style="font-size: 15px">${recipie.stars}</p>
                    </div>
                  </div>
                  <div class="row m-2">
                    <div class="col">
                    <a href='https://www.facebook.com/sharer/sharer.php?u=http://rosinarecipe.bytfm.com/' target='_blank'><i class="fab fa-facebook mr-2" style="color: var(--red); font-size: 18px"></i></a>
                      <a href='http://www.twitter.com/share?url=http://rosinarecipe.bytfm.com/' target='_blank'><i class="fab fa-twitter mr-2" style="color: var(--red); font-size: 18px"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row my-4 mx-0 w-100 pt-3 px-4">
                <div class="col-12 col-md-7 my-2 p-3">
                  <h4 class="font-weight-bold mb-5">These are the steps to follow</h4>
                  ${this.instructions()}
                </div>
                <div class="col-12 col-md-5 my-2 p-3">
                  <h4 class="font-weight-bold mb-5">These are your ingredients!</h4>
                  ${this.ingredients()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('recipie-modal', RecipieModal)
