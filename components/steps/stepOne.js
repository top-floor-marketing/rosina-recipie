const stepOneTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
    <div class='row'>
      <div class='col-md-6 text-right responsive-align-center'>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round d-flex align-items-center">
            <img src="../../../assets/img/Fork.svg" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Pasta</p>
          </span>
        </label>
      </div>
      <div class='col-md-6 text-left responsive-align-center'>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round d-flex align-items-center">
            <img src="../../../assets/img/Meatballs.svg" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Meat Balls</p>
          </span>
        </label>
      </div>
    </div>
    `
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
}

// Registers custom element
window.customElements.define('step-1', stepOne)
