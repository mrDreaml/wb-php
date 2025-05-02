class AnimatedButtonBurgerMenu extends HTMLElement {
  onToggleBurgerMenu

  constructor() {
    super();
    this.shadowRoot.querySelector('button').onclick = this.#handleClick.bind(this)
  }

  #handleClick () {
    const isActive = this.toggleAttribute('active')
    this.onToggleBurgerMenu(isActive)
  }

  close () {
    this.removeAttribute('active')
  }
}

customElements.define('animated-button-burger-menu', AnimatedButtonBurgerMenu)