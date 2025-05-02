class View extends HTMLElement {
  onCalcPosition
  #timer

  static observedAttributes = ['hidden'];

  constructor() {
    super();

    const template = document.getElementById("template-main-menu");
    this.appendChild(template.content.cloneNode(true));

    this.#initListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'hidden') {
      this.#toggleMenu(newValue !== null)
    }
  }

  #open () {
    clearTimeout(this.#timer)
    this.style.display = 'flex'
    this.classList.remove('hide-menu-transition')
    this.classList.add('show-menu-transition')
    this.style.top = this.onCalcPosition().top
  }

  #close () {
    this.classList.remove('show-menu-transition')
    this.classList.add('hide-menu-transition')
    clearTimeout(this.#timer)
    this.#timer = setTimeout(() => {
      this.style.display = 'none'
    }, 500)
  }

  #toggleMenu (isHidden) {
    if (!isHidden) {
      this.#open()
    } else {
      this.#close()
    }
  }

  #initListeners() {

  }
}

customElements.define("main-menu", View)