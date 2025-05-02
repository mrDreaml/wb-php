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
  #connectedChildren = [];
  #autoscrollMS = null;
  #autoScrollDirection = "right"; // left | right
  #gap = 0

  constructor() {
    super();
    
    this.shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("template-slider");
    this.shadow.appendChild(template.content.cloneNode(true));
  }


  connectedCallback() {
    if (!checkIsTouchEnabled()) {
      this.#initMouseScrollListeners();
    } else {
      this.#initTouchListeners();
    }

    if (this.children[0].tagName === "SLOT") {
      this.#connectedChildren = this.children[0].assignedElements();
    } else {
      this.#connectedChildren = [...this.children];
    }
    if (!this.#connectedChildren.length) {
      throw new Error("Slider: no childs");
    }

    setTimeout(() => {
      this.mounted();
    });
  }

  mounted() {
    this.#setupMaxValue();
    this.#setupInitialSize();
    if (this.#isInfinity) {
      this.#initInfinityMode();
    }
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
      case "gap":
        this.#setGap(newValue)
        break
    }
  }

  get value() {
    return this.#value ?? this.getAttribute("value") ?? 0;
  }

  set value(newValue) {
    this.#value = Math.max(Math.min(Number(newValue), this.#maxValue), 0);
    this.#navigateToSlide(newValue);
  }

  get slidesCount() {
    return this.#connectedChildren.length;
  }

  get isInfinity() {
    return this.#isInfinity;
  }

  #initInfinityMode() {
    const firstChildEl = this.#connectedChildren[0];
    const lastChildEl = this.#connectedChildren.at(-1);
    const { parentNode } = firstChildEl;

    parentNode.prepend(lastChildEl.cloneNode(true));
    parentNode.append(firstChildEl.cloneNode(true));
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

  #getCalculatedWidth() {
    return this.#width - this.#gap * 4
  }

  #setupSizeForConnectedChildrens() {
    this.#connectedChildren.forEach((el) => {
      el.style.width = this.#getCalculatedWidth() + "px";
      el.style.height = this.#height + "px";
    });
  }

  #navigateToSlide(index, behavior = "smooth") {
    if (this.#isInfinity) {
      index = index + 1;
    }

    const scrollLeft = (-this.#gap) + index * this.#getCalculatedWidth()

    this.scrollTo({
      top: 0,
      left: scrollLeft,
      behavior,
    });
  }

  #onStopDrag() {
    if (!this.#isDragging) return;
    const newSlideIndex = this.#calcValueByScrollPosition();
    this.#isDragging = false;
    if (newSlideIndex !== this.value) {
      const event = new CustomEvent("user-change-slide", {
        detail: { prevValue: this.value, newValue: newSlideIndex },
        bubbles: true,
      });
      this.dispatchEvent(event);
    }
    this.value = newSlideIndex;
    this.style.cursor = "grab";

    this.#stopConatinerSwitchToSnap();
    this.#scrollXTimer = setTimeout(() => {
      this.style.scrollSnapType = "x mandatory";
      if (this.#isInfinity) {
        this.#handleEdgesInfinityScroll(newSlideIndex);
      }
    }, 400);
  }

  #stopConatinerSwitchToSnap() {
    clearTimeout(this.#scrollXTimer);
  }

  #onContainerMouseDown(e) {
    this.#isDragging = true;
    this.#startX = e.pageX - this.offsetLeft;
    this.#scrollLeft = this.scrollLeft;

    this.style.scrollSnapType = "none";
    this.style.cursor = "grabbing";
    this.#stopAutoScroll();
    this.#stopConatinerSwitchToSnap();
  }

  #onContainerMouseMove(e) {
    if (!this.#isDragging) return;
    e.preventDefault();
    const x = e.pageX - this.offsetLeft;
    const walkX = (x - this.#startX) * 2;
    this.scrollLeft = this.#scrollLeft - walkX;
  }

  #calcValueByScrollPosition() {
    let value = Math.round(this.scrollLeft / this.#getCalculatedWidth());
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
    if (actualIndex >= this.slidesCount) {
      this.value = 0;
      this.#navigateToSlide(this.value, "instant");
      this.#dispatchChangeSlideEvent(this.value);
      return;
    } else if (actualIndex < 0) {
      this.value = this.slidesCount;
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

    this.onmousedown = this.#onContainerMouseDown.bind(this);
    this.onmousemove = this.#onContainerMouseMove.bind(this);
    this.onmouseup = onStopDragBind;
    this.onmouseleave = onStopDragBind;
    this.onscrollend = () => this.#onScollEnd(false);
  }

  #initTouchListeners() {
    this.onscrollend = () => this.#onScollEnd(true);
    this.ontouchstart = () => this.#stopAutoScroll();
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
    this.#maxValue = this.#connectedChildren.length - 1;
  }

  #setInfinity() {
    this.#isInfinity = true;
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
    this.#autoscrollMS = value;
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

  #setGap(value) {
    this.#gap = value ? +value : 0

    if (value) {
      this.style.padding = `0 ${value}px`
    } else {
      this.style.padding = ''
    }
  }
}

defineElementOnContentLoaded('base-slider', View)