
class RecipieModal extends HTMLElement {
  constructor () {
    super()
    this.images = ['./assets/img/carousel-placeholder.jpg']
    this.innerHTML = this.render()
  }

  carousel () {
    let indicator = ''
    let imageContainer = ''
    this.images.forEach((image, index) => {
      const isActive = index === 0 ? 'active' : ''
      indicator += /* html */`
        <li data-target="#recipieCarousel" data-slide-to="0" class="${isActive}">
        </li>
      `
      imageContainer += /* html */`
        <div class="carousel-item ${isActive} p-0">
          <img class="d-block w-100" src="${image}">
        </div>
      `
    })

    return /* html */ `
      <div id="recipieCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          ${indicator}
        </ol>
        <div class="carousel-inner rounded">
          ${imageContainer}
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    `
  }

  render () {
    return /* html */`
      <div class='modal fade' id='recipieModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog' role='document' style="max-width: 80vw">
          <div class='modal-content'>
            <div class='modal-body p-0'>
              <div class="row">
                <div class="col">
                  <button type='button' class='close position-absolute modal-close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                  ${this.carousel()}
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
