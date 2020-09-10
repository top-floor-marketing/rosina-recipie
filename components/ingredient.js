
const mainIngredientTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
      <div class='row align-items-center mb-4'>
        <div class='col-md-7 col-xs-12 mb-3'>
          <input type=text class='w-100 mat-text-field'>
        </div>
        <div class='col px-1'>
          <more-less />
        </div>
        <div class='col px-1'>
          <units-dropdown>
        </div>
        <div class='col-xs-1 pl-3'>
          <i class="remove-ingredient fas fa-trash rosina-red hover-pointer"></i>
        </div>
      </div>
        `
}

class ingredient extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.state = {
      remove: false,
      quantity: 0.25,
      measureUnit: 'drop'
    }

    this.addEventListener('more-less', (event) => {
      const { currAmount } = event.detail
      this.state.quantity = currAmount
    })

    this.addEventListener('measure-unit', (event) => {
      const { currAmount } = event.detail
      this.state.measureUnit = currAmount
    })

    this.render()
  }

  render () {
    this.innerHTML = this.state.remove ? '' : mainIngredientTemplate()
    if (this.innerHTML !== '') {
      this.listeners()
    }
  }

  listeners () {
    this.querySelector('.remove-ingredient').addEventListener('click', () => {
      this.state.remove = true
      this.render()
    })
    this.querySelector('.mat-text-field').addEventListener('change', (e) => {
      this.state.ingredient = e.target.value
    })
  }
}

// Registers custom element
window.customElements.define('ingredient-view', ingredient)
