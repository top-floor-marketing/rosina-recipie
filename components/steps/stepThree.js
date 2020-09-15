const steps = (steps) => {
  let finalSteps = ''
  steps.forEach((step, index) => {
    finalSteps += /* html */`
      <div class="row my-3 animate__fadeInUp">
        <div class="col-10">
          <p class="m-0 text-break" style="border-bottom: 1px solid #C6C6C6;">${step}</p>
        </div>
        <div class="col-1 my-auto text-center p-0">
          <i class="fas fa-bars" style="color: var(--green); cursor: grab"></i>
        </div>
        <div class="col-1 my-auto text-center p-0">
          <i class="fas fa-trash delete-step" index="${index}" style="color: var(--red); cursor: pointer"></i>
        </div>
      </div>
    `
  })
  return /* html */ `
    <div class="w-100" id="sortable">
      ${finalSteps}
    </div>
  `
}

const inputStep = () => {
  return /* html */`
    <div class="row animate__animated animate__fadeInUp">
      <div class="col-12 col-md-10">
        <input
          type="text"
          id="newStep"
          class="w-100 border-top-0 border-left-0 border-right-0"
          style="border-bottom: 1px solid #C6C6C6;"
          placeholder="Add Your Cooking Instructions Step - by - Step Here"
        >
      </div>
    </div>
    <div class="row animate__animated animate__fadeIn animate__delay-1s">
      <div class="col">
        <button
          type="button"
          class="btn text-white rounded-pill py-1 mt-4"
          style="background-color: var(--green)"
          id="addStep"
        >
          <i class="fas fa-plus text-white"></i>
          Add a step
        </button>
      </div>
    </div>
  `
}

class stepThree extends HTMLElement {
  constructor () {
    super()
    // define store
    this.state = Redux.createStore(this.reducer, {
      index: { current: null },
      steps: []
    })

    this.previousValue = []
    this.nextListener = false

    // Re render on store change
    this.subscription = this.state.subscribe(() => {
      // Check if re-render is needed
      if (this.state.getState().steps.length !== this.previousValue.length) {
        this.render()
      }
      this.previousValue = [...this.state.getState().steps]
    })
    this.render()
  }

  disconnectedCallback () {
    this.subscription()
  }

  connectedCallback () {
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

  reducer (state, action) {
    switch (action.type) {
      case 'ADD_STEP':
        state.steps.push(action.payload)
        break
      case 'REMOVE_STEP':
        state.steps.splice(action.payload, 1)
        break
      case 'SET_CURRENT':
        state.index.current = action.payload
        break
      case 'MOVE_STEP':
        state.steps.splice(action.payload.to, 0, state.steps.splice(state.index.current, 1)[0])
    }
    return state
  }

  render () {
    this.innerHTML = steps(this.state.getState().steps)
    this.innerHTML += inputStep()

    // add sortability in each render
    $('#sortable').sortable({
      start: (e, ui) => {
        const currentIndex = ui.item.index()
        this.state.dispatch({ type: 'SET_CURRENT', payload: currentIndex })
      },
      update: (e, ui) => {
        var newIndex = ui.item.index()
        this.state.dispatch({ type: 'MOVE_STEP', payload: { to: newIndex } })
      }
    })

    // Add listener to add a step button
    const addStep = this.querySelector('#addStep')
    const stepInput = this.querySelector('#newStep')
    addStep.addEventListener('click', () => {
      if (stepInput.value.length > 0) {
        this.state.dispatch({ type: 'ADD_STEP', payload: stepInput.value })
      }
    })

    // Add listener to deletes
    const deleteStep = this.querySelectorAll('.delete-step')
    deleteStep.forEach(step => step.addEventListener('click', (e) => {
      this.state.dispatch({ type: 'REMOVE_STEP', payload: e.target.getAttribute('index') })
    }))

    if (!this.nextListener) {
      // Listen to the next action
      const next = document.querySelector('#next-step')
      next.addEventListener('click', () => {
        globalStore.dispatch({ type: 'ADD_RECIPE_STEPS', payload: this.state.getState().steps })
      })
      this.nextListener = true
    }
  }
}

// Registers custom element
window.customElements.define('step-3', stepThree)
