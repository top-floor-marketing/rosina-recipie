const templateInfiniteScroll = (data) => {
  let cards = ''
  data.forEach(result => {
    cards += /* html */`
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 mb-4">
        <recipie-card
          picture='${result.picture.large}'
          title='${result.email}'
          subtitle='${result.location.state}'
          stars='${result.dob.age}'
          userPicture='${result.picture.thumbnail}'
          userName='${result.name.first} ${result.name.last}'
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
  static get observedAttributes () {
    return ['recipies', 'loadingmore']
  }

  constructor () {
    super()
    // Get fetching url
    this.page = this.getAttribute('page') || 1
    this.perPage = this.getAttribute('perPage') || 12

    this.url = this.getAttribute('url')
      ? `${this.getAttribute('url')}?page=${this.page}&results=${this.perPage}`
      : `https://randomuser.me/api/?page=${this.page}&results=${this.perPage}`
    this.recipies = []
    this.loadingmore = false

    // Set the loading indicator
    this.innerHTML = spinner()
  }

  async loadMoreRecipies () {
    this.setAttribute('loadingmore', true)
    // Update the url
    this.page = this.page++
    // call fetch
    await this.fetchData()
    // Set loading more
    this.setAttribute('loadingmore', false)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this[name] = JSON.parse(newValue)
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

      this.setAttribute('recipies', JSON.stringify(newRecipies))
    } catch (e) {
      console.log(e)
      this.innerHTML = error()
    }
  }

  render () {
    this.innerHTML = templateInfiniteScroll(this.recipies)

    // Add the load More button
    this.innerHTML += loadMoreButton(this.loadingmore)

    // set event listener for load more
    const loadMore = this.querySelector('#loadMore')
    loadMore.addEventListener('click', () => this.loadMoreRecipies())
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
