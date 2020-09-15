const stepTwoTemplate = (x) => {
  return /* html */ `
  <div class='row align-items-center mb-4 header-ingredients'>
  <div class='col-md-7 col-xs-12'>
    <p>Ingredient</p>
  </div>
  <div class='col px-1'>
    <p>Amount</p>
  </div>
  <div class='col px-1'>
    <p>Measurement</p>
  </div>
</div>
  <div>
    <floating-widget />
  </div>
  <div class='row append-ingredient animate__fadeInUp'>
    <button type="button" class="btn text-white rounded-pill py-2 px-4 mb-2 add-ingredient animate__animated animate__fadeIn animate__delay-1s" style="background-color: var(--green); width: 180px;">
      <i class="fas fa-plus mr-1"></i>
      Add Ingredient
    </button>
  </div>
  `
}

class stepTwo extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.render()
  }

  render () {
    this.innerHTML = stepTwoTemplate()
    const element = document.createRange().createContextualFragment("<div class='col-md-12'><ingredient-view /></div>")
    this.querySelector('.append-ingredient').insertBefore(element, this.querySelector('.add-ingredient'))
    this.listeners()
  }

  listeners () {
    this.querySelector('.add-ingredient').addEventListener('click', () => {
      const element = document.createRange().createContextualFragment("<div class='col-md-12'><ingredient-view /></div>")
      this.querySelector('.append-ingredient').insertBefore(element, this.querySelector('.add-ingredient'))
    })
  }
}

// Registers custom element
window.customElements.define('step-2', stepTwo)
