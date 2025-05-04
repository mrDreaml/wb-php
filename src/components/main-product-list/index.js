import { defineElementOnContentLoaded } from "/src/shared/services/webComponents.js";

class MainProductList extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    super();
    this.#initListeners();
  }

  connectedCallback() {
    console.log("Custom element added to page. Main Product List");
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

defineElementOnContentLoaded("main-product-list", MainProductList);
