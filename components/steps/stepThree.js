const stepThreeTemplate = ({
  testProp = 'test'
} = {}) => {
  return `
      <p class='animate__animated animate__fadeInUp'>Step 3</p>
      `
}

class stepThree extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    const props = ['testProp']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = stepThreeTemplate(templateProps)
  }
}

// Registers custom element
window.customElements.define('step-3', stepThree)
