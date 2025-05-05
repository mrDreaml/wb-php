class ShadowArea extends HTMLElement {
  static observedAttributes = ['hidden'];
  #transitionTimer

  constructor() {
    super();
  }

  show () {
    this.style.display = 'block'
    this.classList.remove('shadow-area__hide')
    this.classList.add('shadow-area__show')
  }

  hide () {
    this.classList.remove('shadow-area__show')
    this.classList.add('shadow-area__hide')
    clearTimeout(this.#transitionTimer)
    this.#transitionTimer = setTimeout(() => {
       this.style.display = 'none'
    }, 300)
  }
}

customElements.define("shadow-area", ShadowArea);
