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

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const stepFiveTemplate = (x) => {
  let emailValidity = true
  if (x.userEmail.length) emailValidity = validateEmail(x.userEmail) ? '' : 'is-invalid'

  return /* html */`
      <div class='row animate__fadeInUp'>
        <div class='col-12 col-md-6'>
        <input id='recipeName' type='text' value='${x.recipeName}' placeholder='Recipe Name' class='w-100 mat-text-field mb-3'>
        <input id='userFirstName' type='text' value='${x.userFirstName}' placeholder='Your First Name' class='w-100 mat-text-field mb-3'>
        <input id='userLastName' type='text' value='${x.userLastName}' placeholder='Your Last Name' class='w-100 mat-text-field mb-3'>
        <div class="form-group">
          <input style="height: 27px" class='form-control ${emailValidity} p-0 rounded-0 w-100 mat-text-field mb-3' id='userEmail' type='email' value='${x.userEmail}' placeholder='Email Address'>
          <div class="invalid-feedback">The provided email is invalid</div>
        </div>
        <input id='userPhone' type='text' value='${x.phone}' placeholder='Phone Number' class='w-100 mat-text-field mb-3'>
        </div>
        <div class='col-12 col-md-6 text-center'>
          ${
            x.userPicture
            ? fileInputStep5()
            : emptyTemplatePic()
          }
          <p class='mt-3 mb-0'>Upload your chef picture!</p>
          <p class='text-muted'>*optional</p>
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
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      phone: '',
      userPicture: null
    })

    this.subscription = this.state.subscribe(() => this.render())
    this.nextListener = false
    this.render()
  }

  reducer (state, action) {
    switch (action.type) {
      case 'UPDATE_USER_FIRST_NAME':
        state.userFirstName = action.payload
        break
      case 'UPDATE_RECIPE_NAME':
        state.recipeName = action.payload
        break
      case 'UPDATE_USER_LAST_NAME':
        state.userLastName = action.payload
        break
      case 'UPDATE_USER_EMAIL':
        state.userEmail = action.payload
        break
      case 'UPDATE_USER_PHONE':
        state.phone = action.payload
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
    const userFirstName = this.querySelector('#userFirstName')
    const userLastName = this.querySelector('#userLastName')
    const recipeName = this.querySelector('#recipeName')
    const userPhone = this.querySelector('#userPhone')

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
    userFirstName.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_USER_FIRST_NAME', payload: e.target.value })
    })

    // User Phone event listener
    userPhone.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_USER_PHONE', payload: e.target.value })
    })

    // User name event listener
    userLastName.addEventListener('change', (e) => {
      this.state.dispatch({ type: 'UPDATE_USER_LAST_NAME', payload: e.target.value })
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
        globalStore.dispatch({ type: 'ADD_USER_FIRST_NAME', payload: state.userFirstName })
        globalStore.dispatch({ type: 'ADD_USER_LAST_NAME', payload: state.userLastName })
        globalStore.dispatch({ type: 'ADD_USER_EMAIL', payload: state.userEmail })
        globalStore.dispatch({ type: 'ADD_USER_PICTURE', payload: state.userPicture })
        globalStore.dispatch({ type: 'ADD_USER_PHONE', payload: state.phone })
      })
      this.nextListener = true
    }
  }
}

// Registers custom element
window.customElements.define('step-5', stepFive)
