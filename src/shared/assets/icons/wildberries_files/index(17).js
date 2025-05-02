import { defineElementOnContentLoaded } from '/src/shared/services/webComponents.js'

class View extends HTMLElement {

  static observedAttributes = [
    "width",
    "height",
    "value",
    "infinity",
    "autoplay",
    "autoplay-direction",
    "gap",
    "slide-controls"
  ];

  constructor() {
    super();
    this.onChangeSlideBind = this.onChangeSlide.bind(this);
    this.shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-navigation-slider");
    this.shadow.appendChild(template.content.cloneNode(true));
    this.slider = this.shadow.querySelector("base-slider");
    this.sliderContainer = this.shadow.querySelector(
      '[data-id="navigation-slider-container"]'
    );
    const controlsSlot = this.sliderContainer.querySelector(
      'slot[name="controls"]'
    );
    const assignedControls = controlsSlot.assignedElements();
    const controls = [
      ...(assignedControls.length ? assignedControls : controlsSlot.children),
    ];
    controls.forEach((el) => {
      if (el.name === "navigation-next") {
        this.btnNext = el;
      }
      if (el.name === "navigation-prev") {
        this.btnPrev = el;
      }
    });
  }

  connectedCallback() {
    this.#initNavigationListeners();

    setTimeout(() => {
      this.mounted();
    });
  }

  mounted() {
    if (this.hasAttribute('slide-controls')) {
      this.#addSlidesControls()
      this.#setActiveSlideControl(this.slider.value);
    }
    this.#setNavigationControlsByIndex(this.slider.value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) return;

    switch (name) {
      case "height":
        this.#setHeight(newValue);
        break;
      case "gap": 
      case "infinity":
      case "value":
      case "autoplay":
      case "width":
      case "autoplay-direction":
        this.#setSliderAttribute(name, newValue);
        break;
    }
  }

  #setNavigationControlsByIndex(index) {
    if (this.slider.isInfinity) return;
    const DISABLE_CLASS_NAME = "navigation-slider__navigate_button__disabled";

    this.btnPrev.classList.remove(DISABLE_CLASS_NAME);
    this.btnNext.classList.remove(DISABLE_CLASS_NAME);
    if (index === 0) {
      this.btnPrev.classList.add(DISABLE_CLASS_NAME);
    } else if (index === this.slider.slidesCount - 1) {
      this.btnNext.classList.add(DISABLE_CLASS_NAME);
    }
  }

  onChangeSlide(eventOrValue) {
    const { value } =
      typeof eventOrValue === "object"
        ? eventOrValue.detail
        : { value: eventOrValue };

    if (this.hasAttribute('slide-controls')) {
      this.#setActiveSlideControl(value);
    }
    this.#setNavigationControlsByIndex(value);
  }

  #setActiveSlideControl(index) {
    const controlsEl = this.sliderContainer.querySelector(
      ".navigation-controls"
    );
    [...controlsEl.children].forEach((itemEl, currentIndex) => {
      if (currentIndex === index) {
        itemEl.setAttribute("active", "");
      } else {
        itemEl.removeAttribute("active");
      }
    });
  }



  #addSlidesControls() {
    const { slidesCount } = this.slider;
    const template = this.shadow.getElementById("template-navigation-controls");
    this.sliderContainer.appendChild(template.content.cloneNode(true));
    const controlsEl = this.sliderContainer.querySelector(
      ".navigation-controls"
    );
    const itemEl = controlsEl.querySelector(".navigation-controls__item");
    itemEl.setAttribute("data-id", 0);
    for (let i = 1; i < slidesCount; i++) {
      const cloneEl = itemEl.cloneNode();
      cloneEl.setAttribute("data-id", i);
      controlsEl.appendChild(cloneEl);
    }
    controlsEl.onclick = (e) => {
      const { id } = e.target.dataset;
      if (!id) return;

      const formattedId = Number(id);
      this.#setActiveSlideControl(formattedId);
      this.slider.value = formattedId;
    };
  }

  #setSliderAttribute(name, value) {
    this.slider.setAttribute(name, value);
  }

  #setHeight(value) {
    this.sliderContainer.style.height = `${value}px`;
  }

  #initNavigationListeners() {
    this.shadow.addEventListener("change-slide", this.onChangeSlideBind);
    this.btnNext.onclick = () => {
      this.slider.value++;
      this.onChangeSlideBind(this.slider.value);
    };

    this.btnPrev.onclick = () => {
      this.slider.value--;
      this.onChangeSlideBind(this.slider.value);
    };
  }
}

defineElementOnContentLoaded('nav-slider', View) 
