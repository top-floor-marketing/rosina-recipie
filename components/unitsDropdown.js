
const unitsDropdownTemplate = () => {
  return /* html */ `
      <style>
        @import "../assets/css/styles.css";
        @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
      </style>
      <div>
          <select class="measure-unit form-control border-0" name="" id="">
            <option value='dash'>dash</option>
            <option value='teaspoon'>teaspoon</option>
            <option value='tablespoon'>tablespoon</option>
            <option value='ounce'>ounce</option>
            <option value='cup'>cup</option>
            <option value='pint'>pint</option>
            <option value='quart'>quart</option>
            <option value='pound'>pound</option>
            <option value='Box'>Box</option>
            <option value='Unit'>Unit</option>
            <option value='Jar'>Jar</option>
            <option value='Package'>Package</option>
            <option value='Can'>Can</option>
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
