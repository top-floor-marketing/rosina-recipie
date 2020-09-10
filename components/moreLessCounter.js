
const moreLessTemplate = () => {
  return /* html */ `
        <style>
          @import "../assets/css/styles.css";
          @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
        </style>
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

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = moreLessTemplate()
  }

  checkAmount () {
    const currentAmount = new CustomEvent('more-less', {
      bubbles: true,
      composed: true,
      detail: {
        currAmount: parseFloat(this.shadowRoot.querySelector('.more-less-number-input').value)
      }
    })

    this.shadowRoot.dispatchEvent(currentAmount)
  }

  connectedCallback () {
    this.shadowRoot.querySelector('.rounded-more-less-right').addEventListener('click', () => {
      this.shadowRoot.querySelector('.more-less-number-input').value = parseFloat(this.shadowRoot.querySelector('.more-less-number-input').value) + 0.25
      this.checkAmount()
    })
    this.shadowRoot.querySelector('.rounded-more-less-left').addEventListener('click', () => {
      if (this.shadowRoot.querySelector('.more-less-number-input').value > 0) {
        this.shadowRoot.querySelector('.more-less-number-input').value = parseFloat(this.shadowRoot.querySelector('.more-less-number-input').value) - 0.25
        this.checkAmount()
      }
    })
  }
}

// Registers custom element
window.customElements.define('more-less', moreLessInput)
