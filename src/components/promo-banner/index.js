import { defineElementOnContentLoaded } from "/src/shared/services/webComponents.js";

class View extends HTMLElement {
  static observedAttributes = [];

  constructor() {
    super();

    const template = document.getElementById("template-promo-banner");
    this.appendChild(template.content.cloneNode(true));

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

defineElementOnContentLoaded("promo-banner", View);
