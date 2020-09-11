const fileInput = (files) => {
  let finalFiles = ''
  files.forEach((file, index) => {
    finalFiles += /* html */ `
      <div class="col-4 col-md-3 col-lg-2 mb-3 px-1">
        <div class="d-flex align-items-center justify-content-center mx-auto" style="height: 6rem; width: 6rem;">
          <i class="fas fa-trash position-absolute text-white hoverable-trash" index="${index}"></i>
          <img class="w-100 h-100 imagepreview" style="object-fit: cover; object-position: top;" /> 
        </div>
      </div>
    `
  })
  return finalFiles
}

const fileUploadComponent = () => {
  return /* html */`
    <div class="col-4 col-md-3 col-lg-2 px-1">
      <div
        class="d-flex justify-content-center align-items-center mx-auto"
        style="height: 6rem; width: 6rem; border: 1px var(--green) dashed; cursor: pointer;"
        id="fileInput"
      >
        <input type='file' class="d-none" /> 
        <i class="fas fa-plus" style="color: var(--green); font-size: 2rem"></i>
      </div>
    </div>
  `
}

class stepFour extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()
    this.store = Redux.createStore(this.reducer, [])

    // Re render on store change
    this.subscription = this.store.subscribe(() => this.render())

    this.render()
  }

  reducer (state, action) {
    switch (action.type) {
      case 'ADD_PICTURE':
        state.push(action.payload)
        break
      case 'REMOVE_PICTURE':
        state.splice(action.payload, 1)
        break
      default:
        return state
    }
    return state
  }

  disconnectedCallback () {
    this.subscription()
  }

  showImage (files) {
    files.forEach((file, index) => {
      // Create a file reader instance
      const reader = new FileReader()

      // Get the reference to image placeholders
      const imagePreviewrs = this.querySelectorAll('.imagepreview')

      // Set the url as the image preview
      reader.onload = (e) => {
        imagePreviewrs[index].setAttribute('src', e.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

  render () {
    const state = this.store.getState()
    console.log(state)

    this.innerHTML = /* html */`
      <div class="row">
        ${fileInput(state)}
        ${fileUploadComponent()}
      </div>
    `

    // Attach event listeners
    const inputFile = this.querySelector('input[type="file"]')
    const placeholder = this.querySelector('#fileInput')
    const trash = this.querySelectorAll('.hoverable-trash')

    // Placeholder Click
    placeholder.addEventListener('click', () => inputFile.click())

    // Input change
    inputFile.addEventListener('change', (e) => {
      this.store.dispatch({ type: 'ADD_PICTURE', payload: e.target.files[0] })
    })

    // Trash click
    trash.forEach(trash => trash.addEventListener('click', (e) => {
      this.store.dispatch({ type: 'REMOVE_PICTURE', payload: e.target.getAttribute('index') })
    }))

    // Make sure the images render as expected
    this.showImage(state)
  }
}

// Registers custom element
window.customElements.define('step-4', stepFour)
