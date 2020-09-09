
const unitsDropdownTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */ `
      <div>
          <select class="form-control" name="" id="">
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
          </select>
      </div>
        `
}

class unitsDropdown extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    const props = ['testProp']
    // Get all the props
    const templateProps = props.reduce((acc, prop) => {
      acc[prop] = this.getAttribute(prop) ? this.getAttribute(prop) : undefined
      return acc
    }, {})

    this.innerHTML = unitsDropdownTemplate(templateProps)
  }
}

// Registers custom element
window.customElements.define('units-dropdown', unitsDropdown)
