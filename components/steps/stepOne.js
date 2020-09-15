const stepOneTemplate = (x) => {
  return /* html */ `
    <div class='row animate__fadeInUp'>
      <div class='col-md-6 text-right responsive-align-center my-5'>
        <label class="switch pasta">
          <input name='pasta' id='pasta' type="checkbox" ${x.includes('pasta') ? 'checked' : ''}>
          <span class="slider round d-flex align-items-center pasta">
            <img src="../../../assets/img/Cheese-Tortellini.png" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Celentano Pasta</p>
          </span>
        </label>
      </div>
      <div class='col-md-6 text-left responsive-align-center my-5'>
        <label class="switch meatballs">
          <input name='meatballs' id='meatballs' type="checkbox" ${x.includes('meatballs') ? 'checked' : ''}>
          <span class="slider round d-flex align-items-center">
            <img src="../../../assets/img/Meatballs.png" class="img-fluid toggler" alt="">
            <p class='in-text my-0 ml-2 font-weight-bold'>Rosina Meatballs</p>
          </span>
        </label>
      </div>
    </div>
    `
}

class stepOne extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.nextListener = false
    this.state = Redux.createStore(this.reducer, [])
    this.subscription = this.state.subscribe(() => this.render())
    this.render()
  }

  reducer (state, action) {
    switch (action.type) {
      case 'ADD_RECIPE_TYPE':
        state.push(action.payload)
        break
      case 'REMOVE_RECIPE_TYPE':
        state = state.filter(x => x !== action.payload)
        break
      default:
        return state
    }
    return state
  }

  disconnectedCallback () {
    this.subscription()
  }

  connectedCallback () {
    // disable next
    document.querySelector('#next-step').disabled = true

    // Animation rerender fix
    this.querySelectorAll('.animate__fadeInUp').forEach(e => {
      e.classList.add('animate__animated')
    })
    this.querySelectorAll('.animate__animated').forEach(element => {
      element.addEventListener('animationend', (e) => {
        e.target.classList.remove('animate__animated')
      })
    })
  }

  render () {
    const state = this.state.getState()
    this.innerHTML = stepOneTemplate(state)
    if (state.length) {
      document.querySelector('#next-step').disabled = false
    } else {
      document.querySelector('#next-step').disabled = true
    }

    // Selectors
    const meatballs = this.querySelector('#meatballs')
    const pasta = this.querySelector('#pasta')

    // event lsiteners
    meatballs.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.state.dispatch({ type: 'ADD_RECIPE_TYPE', payload: e.target.name })
      } else {
        this.state.dispatch({ type: 'REMOVE_RECIPE_TYPE', payload: e.target.name })
      }
    })

    pasta.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.state.dispatch({ type: 'ADD_RECIPE_TYPE', payload: e.target.name })
      } else {
        this.state.dispatch({ type: 'REMOVE_RECIPE_TYPE', payload: e.target.name })
      }
    })

    // Listen for next step click
    if (!this.nextListener) {
      // Listen to the next action
      const next = document.querySelector('#next-step')
      next.addEventListener('click', () => {
        globalStore.dispatch({ type: 'ADD_RECIPE_TYPE', payload: state })
      })
      this.nextListener = true
    }
  }
}

// Registers custom element
window.customElements.define('step-1', stepOne)
