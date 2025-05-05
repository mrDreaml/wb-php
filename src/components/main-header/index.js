class View extends HTMLElement {
  #topBarEl
  #mainHeaderEl
  #isFixedMode = false

  static observedAttributes = [];

  constructor() {
    super();
    
    this.#topBarEl = this.shadowRoot.querySelector('[data-id=main-header-top]')
    this.#mainHeaderEl = this.shadowRoot.querySelector('[data-id=main-header]')
    this.reserved = this.shadowRoot.querySelector('[data-id=reserved]')

    this.#initListeners()
  }

  #switchToFixedMode () {
    this.style.marginBottom = `${this.#mainHeaderEl.clientHeight - 3}px`
    this.reserved.removeAttribute('hidden')
    this.#topBarEl.setAttribute('hidden', '')
    this.#mainHeaderEl.classList.add('main-header__fixed')
    this.#isFixedMode = true
  }

  #switchToDefaultMode () {
    this.style.marginBottom = 0
    this.reserved.setAttribute('hidden', '')
    this.#topBarEl.removeAttribute('hidden')
    this.#mainHeaderEl.classList.remove('main-header__fixed')
    this.#isFixedMode = false
  }

  #handleScroll (e) {
    if (window.scrollY > this.#topBarEl.clientHeight) {
      !this.#isFixedMode && this.#switchToFixedMode()
    } else {
      this.#isFixedMode && this.#switchToDefaultMode()
    }
  }

  #initListeners () {
    document.onscroll = this.#handleScroll.bind(this)
  } 
}

customElements.define('main-header', View)
