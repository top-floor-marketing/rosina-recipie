const stepTitle = (x) => {
  switch (x) {
    case 1: return 'Step 1'
    case 2: return 'Step 2'
    case 3: return 'Step 3'
    case 4: return 'Step 4'
    case 5: return 'Step 5'
    case 6: return 'Step 6'
    default: return 'no data'
  }
}

const stepDescription = (x) => {
  switch (x) {
    case 1: return 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'
    case 2: return 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'
    case 3: return 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.'
    case 4: return 'Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.'
    case 5: return 'Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.'
    case 6: return 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.'
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
      <h5 class="modal-title w-100 mb-3" id="recipeModalLable">${stepTitle(currentStep)}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <p class='mb-5 animate__animated animate__fadeIn text-center'>${stepDescription(currentStep)}</p>
      ${currentStepComponent(currentStep)}
    </div>
    <div class="modal-footer border-0">
        <button data-toggle="modal" data-target="#recipeModal" type="button" class="btn text-white rounded-pill mr-3 py-2 px-4 mb-2 position-absolute" style="left: 10px; background-color: var(--red)">
            Cancel
        </button>
        <button ${disableNext ? 'disabled' : ''} id='next-step' type="button" class="btn text-white rounded-pill py-2 px-4 mb-2" style="background-color: var(--green)">
            Next
        </button>
    </div>
  </div>
</div>`
}

class wizardContainer extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.wizardState = {
      currentStep: 1,
      disableNext: false
    }

    this.innerHTML = wizardTemplate(this.wizardState)

    this.querySelector('#next-step').addEventListener('click', () => {
      if (this.wizardState.currentStep === 6) {
        this.wizardState.currentStep = 1
      } else {
        this.wizardState.currentStep = this.wizardState.currentStep + 1
      }
      this.update()
    })
  }

  update () {
    this.innerHTML = wizardTemplate(this.wizardState)
    this.querySelector('#next-step').addEventListener('click', () => {
      if (this.wizardState.currentStep === 6) {
        this.wizardState.currentStep = 1
      } else {
        this.wizardState.currentStep = this.wizardState.currentStep + 1
      }
      this.update()
    })
  }
}

// Registers custom element
window.customElements.define('wizard-container', wizardContainer)
