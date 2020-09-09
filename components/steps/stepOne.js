const stepOneTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
    <div class='row animate__animated animate__fadeInUp'>
      <div class='col-md-6 text-right responsive-align-center'>
        <label class="switch pasta">
          <input onclick="addRemoveRecipeType('pasta')" type="checkbox">
          <span class="slider round d-flex align-items-center">
            <img src="../../../assets/img/Fork.svg" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Pasta</p>
          </span>
        </label>
      </div>
      <div class='col-md-6 text-left responsive-align-center'>
        <label class="switch meatballs">
          <input onclick="addRemoveRecipeType('meatballs')" type="checkbox">
          <span class="slider round d-flex align-items-center">
            <img src="../../../assets/img/Meatballs.svg" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Meat Balls</p>
          </span>
        </label>
      </div>
    </div>
    `
}

const addRemoveRecipeType = (type) => {
  if (recipeData.recipeType.find(x => x === type)) {
    const newRecipeType = recipeData.recipeType.filter(e => { return e !== type })
    recipeData.recipeType = newRecipeType
    if (recipeData.recipeType.length === 0) {
      document.querySelector('#next-step').disabled = true
    } else {
      document.querySelector('#next-step').disabled = false
    }
  } else {
    recipeData.recipeType.push(type)
    document.querySelector('#next-step').disabled = false
  }
}

class stepOne extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    const props = ['testProp']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = stepOneTemplate(templateProps)
  }

  connectedCallback () {
    document.querySelector('#next-step').disabled = true
  }
}

// Registers custom element
window.customElements.define('step-1', stepOne)
