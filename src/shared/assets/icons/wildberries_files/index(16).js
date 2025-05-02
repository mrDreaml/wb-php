import { throttle } from "/src/shared/utils/throttleDebounce.js";

class View extends HTMLElement {
  searchSuggestionsPromise
  onSaveSearchedValues
  onReadSearchedValues
  onShowDropdown
  onHideDropdown

  #handleComponentClickBind;
  #itemIndex = -1;
  #allDropdownEls = [];
  #requestSuggestionsThrottled;

  static observedAttributes = [];

  constructor() {
    super();

    const template = document.getElementById("template-product-search-input");
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.inputEl = this.shadow.querySelector("input[name=search-input]");
    this.photoButtonEl = this.shadow.querySelector("button[name=photo-button]");
    this.inputControlsEl = this.shadow.querySelector(
      "[data-id=product-search__input-controls]"
    );
    this.searchButtonEl = this.inputControlsEl.querySelector(
      "button[name=search-button]"
    );
    this.clearButtonEl = this.shadow.querySelector("button[name=clear-button]");
    this.dropdownEl = this.shadow.querySelector("[data-id=dropdown]");
    this.dropdownListRecent = this.shadow.querySelector(
      "[data-id=dropdown-recent]"
    );
    this.dropdownListSuggestions = this.shadow.querySelector(
      "[data-id=dropdown-suggestions]"
    );
    this.dropdownListRecentItemTemplate = this.shadow.getElementById(
      "template-product-search-input__dropdown-recent-item"
    );
    this.dropdownListSuggestionItemTemplate = this.shadow.getElementById(
      "template-product-search-input__dropdown-suggestions-item"
    );
    this.#handleComponentClickBind = this.#handleComponentClick.bind(this);
    this.#requestSuggestionsThrottled = throttle(
      this.#requestSuggestions.bind(this),
      200
    );
  }

  connectedCallback() {
    this.#initListeners();
  }

  disconnectedCallback() {
    this.shadow.removeEventListener(
      "mousedown",
      this.#handleComponentClickBind
    );
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  set itemIndex(value) {
    if (value >= this.#allDropdownEls.length) {
      value = 0;
    } else if (value < 0) {
      value = this.#allDropdownEls.length - 1;
    }

    let currentSelectedItem = this.#allDropdownEls[this.#itemIndex];
    if (currentSelectedItem) {
      currentSelectedItem.classList.remove(
        "product-search-dropdown__list__selected"
      );
    }

    this.#itemIndex = value;
    currentSelectedItem = this.#allDropdownEls[this.#itemIndex];
    if (currentSelectedItem) {
      this.inputEl.value =
        currentSelectedItem.querySelector("span").textContent;
      currentSelectedItem.classList.add(
        "product-search-dropdown__list__selected"
      );
    }
  }

  get itemIndex() {
    return this.#itemIndex;
  }

  #renderDropdownInitial() {
    this.#itemIndex = -1;
    this.#requestSuggestionsThrottled(this.inputEl.value);
  }

  #showDropdown() {
    this.dropdownEl.removeAttribute("hidden");
    this.#renderDropdownInitial();
    this.onShowDropdown()
  }

  #setTypingMode(hasValue) {
    if (hasValue) {
      this.photoButtonEl.setAttribute("hidden", "");
      this.inputControlsEl.removeAttribute("hidden");
    } else {
      this.inputControlsEl.setAttribute("hidden", "");
      this.photoButtonEl.removeAttribute("hidden");
    }
  }

  #resetDropdownHighlights() {
    this.#itemIndex = -1;
    this.#allDropdownEls.forEach((el) =>
      el.classList.remove("product-search-dropdown__list__selected")
    );
  }

  #showSuggestions(recentSearch, suggestions) {
    const isTitleShwon = !this.inputEl.value;

    this.dropdownListRecent.innerHTML = "";
    recentSearch.forEach((itemText) => {
      const el = this.dropdownListRecentItemTemplate.content.cloneNode(true);
      el.querySelector("span").textContent = itemText;
      this.dropdownListRecent.appendChild(el);
    });

    this.dropdownListSuggestions.innerHTML = "";
    suggestions.forEach((itemText) => {
      const el =
        this.dropdownListSuggestionItemTemplate.content.cloneNode(true);
      el.querySelector("span").textContent = itemText;
      this.dropdownListSuggestions.appendChild(el);
    });

    const dropdownRecentTitleEl = this.dropdownEl.querySelector(
      "[data-id=dropdown-recent-title]"
    );
    const dropdownSuggestionsTitleEl = this.dropdownEl.querySelector(
      "[data-id=dropdown-suggestions-title]"
    );

    dropdownRecentTitleEl.setAttribute("hidden", "");
    dropdownSuggestionsTitleEl.setAttribute("hidden", "");
    if (isTitleShwon) {
      if (this.dropdownListRecent.innerHTML.length) {
        dropdownRecentTitleEl.removeAttribute("hidden");
      }

      if (this.dropdownListSuggestions.innerHTML.length) {
        dropdownSuggestionsTitleEl.removeAttribute("hidden");
      }
    }

    this.#allDropdownEls = this.dropdownEl.querySelectorAll(
      "[data-dropdown-item]"
    );
  }

  #handleComponentClick(e) {
    if (e.target.dataset.id === "btn-remove-dropdown-item") {
      const listItemEl = e.target.closest("li");
      this.#removeRecentSearchItem(listItemEl.querySelector("span").textContent);
      this.#requestSuggestions(this.inputEl.value);
      this.inputEl.focus();
    } else if (e.target.closest("[data-dropdown-item]")) {
      const listItemEl = e.target.closest("[data-dropdown-item]");
      this.inputEl.value = listItemEl.querySelector("span").textContent;
      this.#triggerSearch();
    }
  }

  #clearInput() {
    this.inputEl.value = "";
    this.#renderDropdownInitial();
    this.#setTypingMode(false)
  }

  #triggerSearch() {
    this.#hideDropdown();
    this.inputEl.blur();
    const { value } = this.inputEl;
    this.#saveSearchValue(value);
    const searchEvent = new CustomEvent("search", {
      detail: { value },
      bubbles: true,
    });
    this.dispatchEvent(searchEvent);
  }

  #handleInput(e) {
    const { value } = e.target;
    this.#setTypingMode(Boolean(value.length));
    this.#requestSuggestionsThrottled(value);
  }

  #handleClickClearButton() {
    this.#clearInput();
    this.inputEl.focus();
  }

  #handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        this.itemIndex--;
        break;
      }
      case "ArrowDown": {
        this.itemIndex++;
        break;
      }
      case "Escape": {
        this.#clearInput();
        break;
      }
      case "Enter": {
        this.#triggerSearch();
        break;
      }
    }
  }

  async #requestSuggestions(text) {
    const searchSuggestions = await this.searchSuggestionsPromise;
    if (!searchSuggestions) {
      throw new Error(
        "product-search-input model: no searchSuggestionsPromise"
      );
    }
    const recentSearchedValuesFilteredByText =
      this.#getRecentSearchedValues().filter((str) => str.includes(text));
    const recentSearchedValuesFilteredByTextSet = new Set(
      recentSearchedValuesFilteredByText
    );
    const suggestionsFilteredByText = searchSuggestions
      .filter((str) => str.includes(text))
      .slice(0, 6);
    const suggestions = (
      suggestionsFilteredByText.length === 0
        ? [text]
        : suggestionsFilteredByText
    ).filter((str) => !recentSearchedValuesFilteredByTextSet.has(str));
    this.#showSuggestions(recentSearchedValuesFilteredByText, suggestions);
  }

  #getRecentSearchedValues() {
    if (this.onReadSearchedValues) {
      return this.onReadSearchedValues()
    } else {
      throw new Error('product-search-input: onReadSearchedValues callback not found')
    }
  }

  #setRecentSearchedValues(searchedValues) {
    if (this.onSaveSearchedValues) {
      this.onSaveSearchedValues(searchedValues)
    } else {
      throw new Error('product-search-input: onSaveSearchedValues callback not found')
    }
  }

  #saveSearchValue(text) {
    if (!text) return;
    let searchedValues = this.#getRecentSearchedValues();
    searchedValues.unshift(text);
    searchedValues = [...new Set(searchedValues)].slice(0, 6);
    this.#setRecentSearchedValues(searchedValues);
  }

  #removeRecentSearchItem(text) {
    if (!text) return;

    const searchedValues = this.#getRecentSearchedValues().filter(
      (item) => item !== text
    );
    this.#setRecentSearchedValues(searchedValues);
  }

  #hideDropdown(isInternalCall = true) {
    this.dropdownEl.setAttribute("hidden", "")
    if (isInternalCall) {
      this.onHideDropdown()
    }
  }

  #initListeners() {
    this.inputEl.onfocus = this.#showDropdown.bind(this);
    this.inputEl.oninput = this.#handleInput.bind(this);
    this.clearButtonEl.onclick = this.#handleClickClearButton.bind(this);
    this.searchButtonEl.onclick = this.#triggerSearch.bind(this);
    this.shadow.onmouseenter = this.#resetDropdownHighlights.bind(this);
    this.onkeydown = this.#handleKeyDown.bind(this);
    this.shadow.addEventListener("mousedown", this.#handleComponentClickBind);
  }

  hideDropdown() {
    this.#hideDropdown(false)
  }

  checkDropdownOpened() {
    return !this.dropdownEl.hasAttribute("hidden");
  }
}


customElements.define('product-search-input', View)
