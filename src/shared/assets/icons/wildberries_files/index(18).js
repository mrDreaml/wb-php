import { defineElementOnContentLoaded } from '/src/shared/services/webComponents.js'

class View extends HTMLElement {
    constructor() {
      super();
      
      this.shadow = this.attachShadow({ mode: "open" });
      const template = document.getElementById('template-slider-item')
      this.shadow.appendChild(template.content.cloneNode(true));
    }

  }

  
defineElementOnContentLoaded('slider-item', View)