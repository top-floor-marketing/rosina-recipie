
const unitsDropdownTemplate = () => {
  return /* html */ `
      <style>
        @import "../assets/css/styles.css";
        @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
      </style>
      <div>
          <select class="measure-unit form-control border-0" name="" id="">
            <option value='drop'>drop</option>
            <option value='smidgen'>smidgen</option>
            <option value='pinch'>pinch</option>
            <option value='dash'>dash</option>
            <option value='pinch'>pinch</option>
            <option value='saltspoon'>saltspoon</option>
            <option value='teaspoon'>teaspoon</option>
            <option value='tablespoon'>tablespoon</option>
            <option value='ounce'>ounce</option>
            <option value='teacup'>teacup</option>
            <option value='cup'>cup</option>
            <option value='pint'>pint</option>
            <option value='quart'>quart</option>
            <option value='pottle'>pottle</option>
            <option value='gallon'>gallon</option>
            <option value='pound'>pound</option>
            <option value='gram'>gram</option>
            <option value='kilogram'>kilogram</option>
            <option value='Bag'>Bag</option>
            <option value='Box'>Box</option>
            <option value='Unit'>Unit</option>
          </select>
      </div>
        `
}

class unitsDropdown extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  checkUnitVal () {
    const measureUnit = new CustomEvent('measure-unit', {
      bubbles: true,
      composed: true,
      detail: {
        currAmount: this.shadowRoot.querySelector('.measure-unit').value
      }
    })
    this.shadowRoot.dispatchEvent(measureUnit)
  }

  render () {
    this.shadowRoot.innerHTML = unitsDropdownTemplate()
  }

  connectedCallback () {
    this.render()
    this.shadowRoot.querySelector('.measure-unit').addEventListener('change', () => {
      this.checkUnitVal()
    })
  }
}

// Registers custom element
window.customElements.define('units-dropdown', unitsDropdown)
