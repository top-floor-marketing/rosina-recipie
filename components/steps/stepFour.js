const stepFourTemplate = ({
  testProp = 'test'
} = {}) => {
  return `
      <p>Step 1</p>
      `
}

class stepFour extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    const props = ['testProp']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = stepFourTemplate(templateProps)
  }
}

// Registers custom element
window.customElements.define('step-4', stepFour)
