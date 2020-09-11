const templateInfiniteScroll = (data) => {
  let cards = ''

  // Data transform OPTIONAL STEP
  const curedData = data.reduce((acc, recipie) => {
    acc.push({
      images: ['./assets/img/carousel-placeholder.jpg'],
      user: {
        name: `${recipie.name.first} ${recipie.name.last}`,
        picture: recipie.picture.large
      },
      recipie: {
        title: recipie.email,
        subtitle: '',
        stars: recipie.dob.age,
        instructions: ['This recipie has no instructions.'],
        ingredients: [{
          ingredient: 'This recipie has no ingredients',
          amount: 0,
          unit: ''
        }]
      }
    })
    return acc
  }, [])

  curedData.forEach(recipie => {
    cards += /* html */`
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
        <recipie-card
          class="recipie-card-class"
          picture='${recipie.images[0]}'
          title='${recipie.recipie.title}'
          subtitle='${recipie.recipie.subtitle}'
          stars='${recipie.recipie.stars}'
          userPicture='${recipie.user.picture}'
          userName='${recipie.user.name}'
          data='${JSON.stringify(recipie)}'"
        />
      </div>
    `
  })
  return /* html */`
    <div class="row">
      ${cards}
    </div>
  `
}

const loadMoreButton = (spining = false) => {
  return /* html */ `
    <div class="row mt-5 justify-content-center">
      <button type="button" id="loadMore" class="btn text-white rounded-pill mr-3 py-2 px-4 mb-2" style="background-color: var(--green)">
        <div class='d-flex align-items-center'>
          <div class='mr-3'>Load more...</div>
          ${
            spining
              ? "<div class='spinner-border spinner-border-sm' role='status' style='color: white; font-size: 12px'><span class='sr-only'>Loading...</span></div>"
              : ''
          }
        </div>
      </button>
    </div>
  `
}

const spinner = () => {
  return /* html */`
  <div class="text-center">
    <div class="spinner-border" role="status" style="color: var(--green)">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `
}

const error = () => {
  return /* html */`
    <span style='color: var(--red)'>There was an errror loading the recipies data. Try again later.</span>
  `
}

class InfiniteScroll extends HTMLElement {
  constructor () {
    super()
    // Get fetching url
    this.page = this.getAttribute('page') || 1
    this.perPage = this.getAttribute('perPage') || 12

    this.url = this.getAttribute('url')
      ? `${this.getAttribute('url')}?page=${this.page}&results=${this.perPage}`
      : `https://randomuser.me/api/?page=${this.page}&results=${this.perPage}`
    this.recipies = []
    this.currentRecipie = null
    this.loadingmore = false

    // Set the loading indicator
    this.innerHTML = spinner()
  }

  async loadMoreRecipies () {
    this.loadingmore = true
    this.render()
    // Update the url
    this.page = this.page++
    // call fetch
    await this.fetchData()
    // Set loading more
    this.loadingmore = false
    this.render()
  }

  async fetchData () {
    try {
      // fetch data from the api
      const response = await fetch(this.url)
      if (!response.ok) { throw new Error() }

      // Parse the data to JSON
      const data = await response.json()

      // Combine the old data and new data
      const newRecipies = [...this.recipies, ...data.results]

      this.recipies = newRecipies
    } catch (e) {
      console.log(e)
      this.innerHTML = error()
    }
  }

  render () {
    this.innerHTML = templateInfiniteScroll(this.recipies)

    // Add the load More button
    this.innerHTML += loadMoreButton(this.loadingmore)

    // Add the modal
    this.innerHTML += `<recipie-modal data='${this.currentRecipie}' />`

    // set event listener for load more & cards
    const loadMore = this.querySelector('#loadMore')
    const recipieCard = this.querySelectorAll('.recipie-card-class')
    loadMore.addEventListener('click', () => this.loadMoreRecipies())
    recipieCard.forEach(card => card.addEventListener('click', () => {
      this.currentRecipie = card.getAttribute('data')
      this.render()
    }))
  }

  async connectedCallback () {
    try {
      // Fetch data
      await this.fetchData()

      // render initial recipies
      this.render()
    } catch (e) {
      console.log(e)
      this.innerHTML = error()
    }
  }
}

window.customElements.define('infinite-scroll', InfiniteScroll)
