class ProductItem extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    super();
    this.#initListeners();
  }

  connectedCallback() {

  }

  disconnectedCallback() {
    
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }

  #renderData () {

  }

  #initListeners() {

  }
}

customElements.define("product-item", ProductItem);
