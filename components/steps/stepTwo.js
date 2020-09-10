const stepTwoTemplate = (x) => {
  return /* html */ `
  <div class='row append-ingredient animate__animated animate__fadeInUp'>
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
