const stepOneTemplate = ({
  testProp = 'test'
} = {}) => {
  return `
    <div class='row'>
      <div class='col-md-6'>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
      <div class='col-md-6'>
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
