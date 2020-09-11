const recipeData = {
  recipeType: [],
  servings: 1,
  recipeSteps: []
}

const stepTitle = (x) => {
  switch (x) {
    case 1: return 'Select a recipe category'
    case 2: return 'Your recipe ingredients'
    case 3: return 'Your recipe steps'
    case 4: return 'Add your recipe pictures'
    case 5: return 'Submit Your Recipe'
    case 6: return 'Your recipe has been submitted!'
    default: return 'no data'
  }
}

const stepDescription = (x) => {
  switch (x) {
    case 1: return ''
    case 2: return ''
    case 3: return ''
    case 4: return ''
    case 5: return 'Submit your original recipe using Rosina meatballs or Celentano pasta (or both!). To submit your recipe, complete each field below and hit ‘next’ to continue. '
    case 6: return 'Congratulations! Your recipe has been submitted and you’ve been entered to win a Williams Sonoma gift card! Check your inbox for updates on winner selection and visit rosinarecipes.com for recipe inspiration, new products, and more!'
    default: return 'no data'
  }
}

const currentStepComponent = (x) => {
  switch (x) {
    case 1: return '<step-1 />'
    case 2: return '<step-2 />'
    case 3: return '<step-3 />'
    case 4: return '<step-4 />'
    case 5: return '<step-5 />'
    case 6: return '<step-6 />'
    default: return '<step-1 />'
  }
}

const wizardTemplate = ({
  currentStep,
  disableNext
} = {}) => {
  return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
  <div class="modal-content border-0">
    <div class="modal-header text-center border-0">
      <h3 class="modal-title w-100 mt-4 mb-3" id="recipeModalLable">${stepTitle(currentStep)}</h3>
    </div>
    <div class="modal-body mb-4">
    <p class='mb-5 animate__animated animate__fadeIn text-center'>${stepDescription(currentStep)}</p>
      ${currentStepComponent(currentStep)}
    </div>
    <div class="modal-footer border-0">
        <button data-toggle="modal" id='cancel-modal' data-target="#recipeModal" type="button" class="btn text-white rounded-pill mr-3 py-2 px-4 mb-2 position-absolute" style="left: 10px; background-color: var(--red)">
            Cancel
        </button>
        <button id='next-step' type="button" class="btn text-white rounded-pill py-2 px-4 mb-2" style="background-color: var(--green)">
            Next
        </button>
    </div>
  </div>
</div>`
}

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RECIPE_TITLE':
      state.recipe.title = action.payload
      break
    case 'ADD_RECIPE_TYPE':
      state.recipe.type = action.payload
      break
    case 'ADD_RECIPE_STEPS':
      state.recipe.steps = action.payload
      break
    case 'ADD_RECIPE_INGREDIENT': {
      const { index, ...rest } = action.payload
      state.recipe.ingredients[index] = { ...state.recipe.ingredients[index], ...rest }
      break
    }
    case 'REMOVE_RECIPE_INGREDIENT':
      state.recipe.ingredients.splice(action.payload, 1)
      break
    case 'ADD_RECIPE_IMAGES':
      state.recipe.images = action.payload
      break
    case 'ADD_RECIPE_SERVINGS':
      state.recipe.servings = action.payload
      break
    case 'ADD_USER_NAME':
      state.user.name = action.payload
      break
    case 'ADD_USER_EMAIL':
      state.user.email = action.payload
      break
    case 'ADD_USER_PICTURE':
      state.user.picture = action.payload
      break
    case 'RESET_STORE':
      console.log(action.payload)
      state = action.payload
      break
    default:
      return state
  }
  console.log(state)
  return state
}

const initialState = {
  recipe: {
    title: '',
    type: [],
    steps: [],
    images: [],
    ingredients: [],
    servings: 0
  },
  user: {
    name: '',
    email: '',
    picture: ''
  }
}

const globalStore = Redux.createStore(globalReducer, {
  recipe: {
    title: '',
    type: [],
    steps: [],
    images: [],
    ingredients: [],
    servings: 0
  },
  user: {
    name: '',
    email: '',
    picture: ''
  }
})

class wizardContainer extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.wizardState = {
      currentStep: 1
    }
    this.update()
  }

  update () {
    this.innerHTML = wizardTemplate(this.wizardState)
    document.querySelector('#cancel-modal').addEventListener('click', () => {
      this.wizardState.currentStep = 1
      recipeData.recipeType.length = 0
      globalStore.dispatch({ type: 'RESET_STORE', payload: initialState })
      this.update()
    })
    this.querySelector('#next-step').addEventListener('click', () => {
      if (this.wizardState.currentStep === 6) {
        $('#recipeModal').modal('hide')
        this.wizardState.currentStep = 1
        recipeData.recipeType.length = 0
      } else {
        this.wizardState.currentStep = this.wizardState.currentStep + 1
      }
      this.update()
    })
  }
}

// Registers custom element
window.customElements.define('wizard-container', wizardContainer)
