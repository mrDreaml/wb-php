class ProductItem extends HTMLElement {
    static observedAttributes = ['loading'];
  
    constructor() {
      super();
      this.#initListeners();
    }
  
    connectedCallback() {
      console.log("Custom element added to page.");
    }
  
    disconnectedCallback() {
      console.log("Custom element removed from page.");
    }
  
    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute \${name} has changed.`);
    }
  
    #initListeners() {
  
    }
  }
  
  customElements.define("product-item", ProductItem);
  