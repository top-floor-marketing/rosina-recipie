
const mainIngredientTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
      <div class='row align-items-center mb-4'>
        <div class='col-md-6 col-12 mb-3'>
          <input type='text' placeholder='Type your ingredient here' class='w-100 mat-text-field'>
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
      index: 0,
      remove: false,
      amount: 0.25,
      unit: 'drop',
      ingredient: ''
    }

    this.addEventListener('more-less', (event) => {
      const { currAmount } = event.detail
      this.state.amount = currAmount
      recipeData.recipeSteps[this.state.index] = this.state
      const { index, amount, unit, ingredient } = this.state
      globalStore.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: { index, amount, unit, ingredient } })
    })

    this.addEventListener('measure-unit', (event) => {
      const { currAmount } = event.detail
      this.state.unit = currAmount
      recipeData.recipeSteps[this.state.index] = this.state
      const { index, amount, unit, ingredient } = this.state
      globalStore.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: { index, amount, unit, ingredient } })
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
      recipeData.recipeSteps[this.state.index] = {}
      globalStore.dispatch({ type: 'REMOVE_RECIPE_INGREDIENT', payload: this.state.index })
      this.render()
    })
    this.querySelector('.mat-text-field').addEventListener('change', (e) => {
      this.state.ingredient = e.target.value
      recipeData.recipeSteps[this.state.index] = this.state
      const { index, amount, unit, ingredient } = this.state
      globalStore.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: { index, amount, unit, ingredient } })
    })
  }

  connectedCallback () {
    if (recipeData.recipeSteps.length === 0) {
      recipeData.recipeSteps.push(this.state)
      const { index, amount, unit, ingredient } = this.state
      globalStore.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: { index, amount, unit, ingredient } })
    } else {
      const newEntry = recipeData.recipeSteps.length
      this.state.index = newEntry
      recipeData.recipeSteps.push(this.state)
      const { index, amount, unit, ingredient } = this.state
      globalStore.dispatch({ type: 'ADD_RECIPE_INGREDIENT', payload: { index, amount, unit, ingredient } })
    }
  }
}

// Registers custom element
window.customElements.define('ingredient-view', ingredient)
