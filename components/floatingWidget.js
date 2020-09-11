const widgetTemplate = ({
  testProp = 'test'
} = {}) => {
  return /* html */`
        <div class='animate__animated animate__fadeInUp widget-servings'>
            <img src="./assets/img/plates.png" class="plate-serving img-fluid animate__animated top-widget" alt="">
            <div class='d-flex align-items-center flex-column p-3 pl-5 shadow bg-white position-absolute rotating-widget'>
                <h5 class='font-weight-bold'>Servings</h5>
                <more-less servings='true' />
            </div>
        </div>
        `
}

class floatingWidget extends HTMLElement {
  // Fires when an instance of the element is created or updated
  constructor () {
    super()

    this.state = {
      servings: 1
    }
    this.innerHTML = widgetTemplate()
    this.addEventListener('more-less', (event) => {
      const { currAmount } = event.detail
      this.state.servings = currAmount
      globalStore.dispatch({ type: 'ADD_RECIPE_SERVINGS', payload: currAmount })
    })
  }
}

$(function () {
  setInterval(function () {
    var animationName = 'animate__tada'
    var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    $('.plate-serving').addClass(animationName).one(animationend, function () {
      $(this).removeClass(animationName)
    })
  }, 5000)
})

// Registers custom element
window.customElements.define('floating-widget', floatingWidget)
