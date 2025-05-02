class View extends HTMLElement {
  onToggleBurgerMenu

  constructor() {
    super();

    const template = document.getElementById(
      'template-animated-button-burger-menu'
    );
    this.appendChild(template.content.cloneNode(true));

    this.querySelector('button').onclick = this.#handleClick.bind(this)
  }

  #handleClick () {
    const isActive = this.toggleAttribute('active')
    this.onToggleBurgerMenu(isActive)
  }

  close () {
    this.removeAttribute('active')
  }
}

customElements.define('animated-button-burger-menu', View)