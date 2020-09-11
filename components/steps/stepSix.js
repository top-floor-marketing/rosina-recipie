const stepSixTemplate = () => {
  return /* html */ `
      <div class='text-center'>
        <img src="./assets/img/success-plate.jpg" class="img-fluid" alt="">
      </div>
      `
}

class stepSix extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    this.innerHTML = stepSixTemplate()
  }
}

// Registers custom element
window.customElements.define('step-6', stepSix)
