const moreLessTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
        <div class='more-less-container d-flex'>
            <div class='more-less-plus text-right p-0'>
                <button class='rounded-more-less-left'>-</button>
            </div>
            <div class='more-less-number p-0 width-60px'>
                <input type='number' value='0.25' class='w-100 text-center more-less-number-input'>
            </div>
            <div class='more-less-minus text-left p-0'>
                <button class='rounded-more-less-right'>+</button>
            </div>
        </div>
        `
}

class moreLessInput extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    const props = ['value']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = moreLessTemplate(templateProps)
  }

  connectedCallback () {
    this.querySelector('.rounded-more-less-right').addEventListener('click', () => {
      this.querySelector('.more-less-number-input').value = parseFloat(this.querySelector('.more-less-number-input').value) + 0.25
    })
    this.querySelector('.rounded-more-less-left').addEventListener('click', () => {
      if (this.querySelector('.more-less-number-input').value > 0) {
        this.querySelector('.more-less-number-input').value = parseFloat(this.querySelector('.more-less-number-input').value) - 0.25
      }
    })
  }
}

// Registers custom element
window.customElements.define('more-less', moreLessInput)
