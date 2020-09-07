const stepOneTemplate = ({
  testProp = 'test'
} = {}) => {
  return `
    <p data-aos="fade-down">Step 1</p>
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
