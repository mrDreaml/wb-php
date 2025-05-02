import { defineElementOnContentLoaded } from '/src/shared/services/webComponents.js'

const checkIsTouchEnabled = () => ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) || 
         (navigator.msMaxTouchPoints > 0);

class View extends HTMLElement {
  static observedAttributes = [
    "width",
    "height",
    "value",
    "infinity",
    "autoplay",
    "autoplay-direction",
    "shrink",
    "gap"
  ];
  #width = 0;
  #height = 0;
  #scrollXTimer = null;
  #isDragging = false;
  #startX = 0;
  #scrollLeft = 0;
  #value = null;
  #maxValue = 0;
  #isInfinity = false;
  #autoscrollMS = null;
  #autoScrollDirection = "right"; // left | right
  #shrink = 0
  #gap = 0
  #initialSlidesCount

  constructor() {
    super();

    this.#initialSlidesCount = this.children.length
    this.btnNext = this.shadowRoot.querySelector('button[name=navigation-next]')
    this.btnPrev = this.shadowRoot.querySelector('button[name=navigation-prev]')
    this.slidesWrapper = this.shadowRoot.querySelector('[data-id=slides-wrapper]')
  }


  connectedCallback() {
    if (!checkIsTouchEnabled()) {
      this.#initMouseScrollListeners();
    } else {
      this.#initTouchListeners();
    }

    this.#setupMaxValue();
    this.#setupInitialSize();

    this.#initNavigationListeners();
    if (this.hasAttribute('slide-controls')) {
      this.#addSlidesControls()
      this.#setActiveSlideControl(this.value);
    }
    this.#setNavigationControlsByIndex(this.value);
  }


  disconnectedCallback() {
    clearTimeout(this.#scrollXTimer);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) return;

    switch (name) {
      case "width":
        this.#setWidth(newValue);
        break;
      case "height":
        this.#setHeight(newValue);
        break;
      case "value":
        if (this.#value === null) {
          this.#navigateToSlide(newValue);
        }
        break;
      case "infinity":
        this.#setInfinity();
        break;
      case "autoplay":
        this.#setAutoplay(newValue);
        break;
      case "autoplay-direction":
        this.#setAutoplayDirection(newValue);
        break;
      case "shrink":
        this.#setShrink(newValue)
        break
      case "gap":
        this.#setGap(newValue)
    }
  }

  get value() {
    return this.#value ?? this.getAttribute("value") ?? 0;
  }

  set value(newValue) {
    this.#value = Math.max(Math.min(Number(newValue), this.#maxValue), 0);
    this.#navigateToSlide(newValue);
    if (this.hasAttribute('slide-controls')) {
      this.#setActiveSlideControl(this.#value);
    }
    this.#setNavigationControlsByIndex(this.#value);
  }

  get isInfinity() {
    return this.#isInfinity;
  }

  #initInfinityMode() {
    const firstChildEl = this.children[0];
    const lastChildEl = this.children[this.children.length - 1];
    const { parentNode } = firstChildEl;

    const newFirstChild = lastChildEl.cloneNode(true)
    const newLastChild = firstChildEl.cloneNode(true)
    newFirstChild.classList.add('base-slider__slider-item')
    newFirstChild.children[0].style.width = '100%'
    newFirstChild.children[0].style.height = '100%'
    newLastChild.classList.add('base-slider__slider-item')
    newLastChild.children[0].style.width = '100%'
    newLastChild.children[0].style.height = '100%'

    parentNode.prepend(newFirstChild);
    parentNode.append(newLastChild);
  }

  #setupInitialSize() {
    if (this.#width && this.height) return;

    const { width, height } = this.parentNode.getBoundingClientRect();

    if (!this.#width) {
      this.#setWidth(width, false);
    }

    if (!this.#height) {
      this.#setHeight(height, false);
    }

    this.#setupSizeForConnectedChildrens();
  }

  #setNavigationControlsByIndex(index) {
    if (this.#isInfinity) return;
    const DISABLE_CLASS_NAME = "navigation-slider__navigate_button__disabled";

    this.btnPrev.classList.remove(DISABLE_CLASS_NAME);
    this.btnNext.classList.remove(DISABLE_CLASS_NAME);
    if (index === 0) {
      this.btnPrev.classList.add(DISABLE_CLASS_NAME);
    } else if (index === this.#initialSlidesCount - 1) {
      this.btnNext.classList.add(DISABLE_CLASS_NAME);
    }
  }

  
  #setActiveSlideControl(index) {
    const controlsEl = this.shadowRoot.querySelector(
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
    const template = this.shadowRoot.getElementById("template-navigation-controls");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const controlsEl = this.shadowRoot.querySelector(
      ".navigation-controls"
    );
    const itemEl = controlsEl.querySelector(".navigation-controls__item");
    itemEl.setAttribute("data-id", 0);
    for (let i = 1; i < this.#initialSlidesCount; i++) {
      const cloneEl = itemEl.cloneNode();
      cloneEl.setAttribute("data-id", i);
      controlsEl.appendChild(cloneEl);
    }
    controlsEl.onclick = (e) => {
      const { id } = e.target.dataset;
      if (!id) return;

      const formattedId = Number(id);
      this.#setActiveSlideControl(formattedId);
      this.value = formattedId;
    };
  }

  #getCalculatedWidth() {
    return this.#width - this.#shrink * 4
  }

  #setupSizeForConnectedChildrens() {
    [...this.children].forEach((el) => {
      el.style.width = this.#getCalculatedWidth() + "px";
      el.style.height = this.#height + "px";
    });
  }

  #navigateToSlide(index, behavior = "smooth") {
    if (this.#isInfinity) {
      index = index + 1;
    }

    const scrollLeft = index * this.#getCalculatedWidth() - this.#shrink
    this.slidesWrapper.scrollTo({
      top: 0,
      left: scrollLeft,
      behavior,
    });
  }

  #onStopDrag() {
    if (!this.#isDragging) return;
    const newSlideIndex = this.#calcValueByScrollPosition();
    this.#isDragging = false;
    this.value = newSlideIndex;
    this.slidesWrapper.style.cursor = "grab";

    this.#stopConatinerSwitchToSnap();
    this.#scrollXTimer = setTimeout(() => {
      this.slidesWrapper.style.scrollSnapType = "x mandatory";
      if (this.#isInfinity) {
        this.#handleEdgesInfinityScroll(newSlideIndex);
      }
    }, 300);
  }

  #stopConatinerSwitchToSnap() {
    clearTimeout(this.#scrollXTimer);
  }

  #onContainerMouseDown(e) {
    this.#isDragging = true;
    this.#startX = e.pageX - this.offsetLeft;
    this.#scrollLeft = this.slidesWrapper.scrollLeft;

    this.slidesWrapper.style.scrollSnapType = "none";
    this.slidesWrapper.style.cursor = "grabbing";
    this.#stopAutoScroll();
    this.#stopConatinerSwitchToSnap();
  }

  #onContainerMouseMove(e) {
    if (!this.#isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.offsetLeft;
    const walkX = (x - this.#startX) * 2;
    this.slidesWrapper.scrollLeft = this.#scrollLeft - walkX;
  }

  #calcValueByScrollPosition() {
    let value = Math.round(this.slidesWrapper.scrollLeft / this.#getCalculatedWidth());
    return this.#isInfinity ? value - 1 : value;
  }

  #dispatchChangeSlideEvent(value) {
    const event = new CustomEvent("change-slide", {
      detail: { value },
      bubbles: true,
    });
    this.dispatchEvent(event);
  }

  #handleEdgesInfinityScroll(actualIndex) {
    if (actualIndex >= this.#initialSlidesCount) {
      this.value = 0;
      this.#navigateToSlide(this.value, "instant");
      this.#dispatchChangeSlideEvent(this.value);
      return;
    } else if (actualIndex < 0) {
      this.value = this.#initialSlidesCount - 1;
      this.#navigateToSlide(this.value, "instant");
      this.#dispatchChangeSlideEvent(this.value);
      return;
    }
  }

  #onScollEnd(isTouchEvent) {
    if (this.#isDragging) return;

    clearTimeout(this.#scrollXTimer);

    if (this.#isInfinity) {
      const actualIndex = this.#calcValueByScrollPosition();
      this.#handleEdgesInfinityScroll(actualIndex);
    }

    const newValue = this.#calcValueByScrollPosition();
    this.#dispatchChangeSlideEvent(newValue);
    if (isTouchEvent) {
      this.value = newValue;
    }
    this.#runAutoScroll();
  }

  #initMouseScrollListeners() {
    const onStopDragBind = this.#onStopDrag.bind(this);

    this.slidesWrapper.onmousedown = this.#onContainerMouseDown.bind(this);
    this.slidesWrapper.onmousemove = this.#onContainerMouseMove.bind(this);
    this.slidesWrapper.onmouseup = onStopDragBind;
    this.slidesWrapper.onmouseleave = onStopDragBind;
    this.slidesWrapper.onscrollend = () => this.#onScollEnd(false);
  }

  #initTouchListeners() {
    this.slidesWrapper.onscrollend = () => this.#onScollEnd(true);
    this.slidesWrapper.ontouchstart = () => this.#stopAutoScroll();
  }

  #initNavigationListeners() {
    this.btnNext.onclick = () => {
      this.value++;
    };

    this.btnPrev.onclick = () => {
      this.value--;
    };
  }

  #setWidth(value, addStyle = true) {
    this.#width = value;
    if (addStyle) {
      this.style.width = `${value}px`;
    }
  }

  #setHeight(value) {
    this.#height = value;
    this.style.height = `${value}px`;
  }

  #setupMaxValue() {
    this.#maxValue = this.children.length - 1;
  }

  #setInfinity() {
    this.#isInfinity = true;
    this.#initInfinityMode();
  }

  #stopAutoScroll() {
    clearInterval(this.autoscrollInterval);
  }

  #runAutoScroll() {
    if (this.#autoscrollMS === null) return;

    this.#stopAutoScroll();
    this.autoscrollInterval = setInterval(() => {
      this.value += this.#autoScrollDirection === "left" ? -1 : 1;
    }, this.#autoscrollMS);
  }

  #setAutoplay(value) {
    this.#autoscrollMS = value || 3000;
    if (this.#autoscrollMS === null) {
      this.#stopAutoScroll();
    } else {
      this.#runAutoScroll();
    }
  }

  #setAutoplayDirection(value) {
    if (value !== "left" && value !== "right") {
      console.error(`Slider: wrong atr autoscroll-direction: ${value}`);
      return;
    }
    this.#autoScrollDirection = value;
    this.#runAutoScroll();
  }

  #setShrink(value) {
    this.#shrink = value ? +value : 0

    if (value) {
      this.style.padding = `0 ${value}px`
    } else {
      this.style.padding = ''
    }
  }

  #setGap(value) {
    this.#gap = value ? +value : 0

    if (value) {
      this.style.gap = `${value}px`
    }
  }
}

defineElementOnContentLoaded('base-slider', View)