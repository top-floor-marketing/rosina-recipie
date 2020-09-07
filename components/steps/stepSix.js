const stepSixTemplate = ({
  testProp = 'test'
} = {}) => {
  return `
      <p class='animate__animated animate__fadeInUp'>Step 6</p>
      `
}

class stepSix extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    const props = ['testProp']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = stepSixTemplate(templateProps)
  }
}

// Registers custom element
window.customElements.define('step-6', stepSix)
