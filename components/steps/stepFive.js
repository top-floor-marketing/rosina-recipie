const fileInputStep5 = () => {
  return /* html */ `
        <div class="d-flex align-items-center justify-content-center mx-auto" style="height: 6rem; width: 6rem;">
          <i class="fas fa-trash position-absolute text-white hoverable-trash"></i>
          <img class="w-100 h-100 imagepreview" style="object-fit: cover; object-position: top;" /> 
        </div>
    `
}

const emptyTemplatePic = () => {
  return /* html */ `
    <div
    class="d-flex justify-content-center align-items-center mx-auto"
    style="height: 6rem; width: 6rem; border: 1px var(--green) dashed; cursor: pointer;"
    id="fileInput">
      <input type='file' class="d-none" /> 
      <i class="fas fa-plus" style="color: var(--green); font-size: 2rem"></i>
    </div>
  `
}

const stepFiveTemplate = (x) => {
  return /* html */`
      <div class='row animate__fadeInUp'>
        <div class='col-12 col-md-6'>
        <input id='recipeName' type='text' value='${x.recipeName}' placeholder='My awesome recipe name' class='w-100 mat-text-field mb-3'>
        <input id='userName' type='text' value='${x.userName}' placeholder='Full name' class='w-100 mat-text-field mb-3'>
        <input id='userEmail' type='email' value='${x.userEmail}' placeholder='email' class='w-100 mat-text-field mb-3'>
        </div>
        <div class='col-12 col-md-6 text-center'>
          ${
            x.userPicture
            ? fileInputStep5()
            : emptyTemplatePic()
          }
          <p class='mt-3'>Upload your chef picture!</p>
        </div>
      </div>
      `
}

class stepFive extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.state = Redux.createStore(this.reducer, {
      recipeName: '',
      userName: '',
      userEmail: '',
      userPicture: null
    })

    this.subscription = this.state.subscribe(() => this.render())
    this.nextListener = false
    this.render()
  }

  reducer (state, action) {
    switch (action.type) {
      case 'UPDATE_USER_NAME':
        state.userName = action.payload
        break
      case 'UPDATE_RECIPE_NAME':
        state.recipeName = action.payload
        break
      case 'UPDATE_USER_EMAIL':
        state.userEmail = action.payload
        break
      case 'UPDATE_USER_PICTURE':
        state.userPicture = action.payload
        break
      case 'REMOVE_PICTURE':
        state.userPicture = null
        break
      default:
        return state
    }
    console.log(state)
    return state
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

  showImage (file) {
    // Create a file reader instance
    const reader = new FileReader()

    // Get the reference to image placeholders
    const imagePreview = this.querySelector('.imagepreview')

    // Set the url as the image preview
    reader.onload = (e) => {
      imagePreview.setAttribute('src', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  render () {
    const state = this.state.getState()
    this.innerHTML = stepFiveTemplate(state)
    if (state.userPicture) {
      this.showImage(state.userPicture)
    }
    // Attach event listeners
    const inputFile = this.querySelector('input[type="file"]')
    const placeholder = this.querySelector('#fileInput')
    const trash = this.querySelector('.hoverable-trash')
    const userEmail = this.querySelector('#userEmail')
    const userName = this.querySelector('#userName')
    const recipeName = this.querySelector('#recipeName')

    // Placeholder Click
    if (placeholder) {
      placeholder.addEventListener('click', () => inputFile.click())
    }

    // Input change
    if (inputFile) {
      inputFile.addEventListener('change', (e) => {
        this.state.dispatch({ type: 'UPDATE_USER_PICTURE', payload: e.target.files[0] })
      })
    }

    // Trash click
    if (trash) {
      trash.addEventListener('click', (e) => {
        this.state.dispatch({ type: 'REMOVE_PICTURE' })
      })
    }

    // Email event listener
    userEmail.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_USER_EMAIL', payload: e.target.value })
    })

    // User name event listener
    userName.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_USER_NAME', payload: e.target.value })
    })

    // Recipe name event listener
    recipeName.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_RECIPE_NAME', payload: e.target.value })
    })

    // Listen for next step click
    if (!this.nextListener) {
      // Listen to the next action
      const next = document.querySelector('#next-step')
      next.addEventListener('click', () => {
        globalStore.dispatch({ type: 'ADD_RECIPE_TITLE', payload: state.recipeName })
        globalStore.dispatch({ type: 'ADD_USER_NAME', payload: state.userName })
        globalStore.dispatch({ type: 'ADD_USER_EMAIL', payload: state.userEmail })
        globalStore.dispatch({ type: 'ADD_USER_PICTURE', payload: state.userPicture })
      })
      this.nextListener = true
    }
  }
}

// Registers custom element
window.customElements.define('step-5', stepFive)
