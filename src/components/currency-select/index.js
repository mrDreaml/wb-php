const CURRENCY_DATA = {
    ru: { flag: 'ru', code: 'RUB' },
    by: { flag: 'by', code: 'BYN' },
    kz: { flag: 'kz', code: 'KZT' },
    amd: { flag: 'amd', code: 'AMD' },
    kgs: { flag: 'kgs', code: 'KGS' },
    uzs: { flag: 'uzs', code: 'UZS' },
  }
  
  class CurrencySelect extends HTMLElement {
    #value
    onSelectValue
    static observedAttributes = ['value'];
  
    constructor() {
      super();

      this.dropdownEl = this.shadowRoot.querySelector('[data-id=dropdown]')
      this.selectItemEl = this.shadowRoot.querySelector('[data-id=currency-select-item]')
  
      this.#initListeners()
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'value' && oldValue !== newValue) {
        this.#selectValue(newValue)
      }
    }

    #markActive() {
        this.shadowRoot.querySelectorAll('[data-id=dropdown-item]').forEach(liEl => {
            liEl.removeAttribute('active')
        })
        const activeEl = this.shadowRoot.querySelector(`li[data-currency=${this.#value}]`)
        activeEl.setAttribute('active', '')
    }
  
    #showDropdown () {
      this.dropdownEl.removeAttribute('hidden')
      this.#markActive()
    }
  
    #hideDropdown () {
      this.dropdownEl.setAttribute('hidden', '')
    }
  
    #selectValue (currency) {
      const currencyData = CURRENCY_DATA[currency]
      if (!currencyData) {
        throw new Error(`currency-select: value ${currency} not supported`)
      }
      const { flag, code } = currencyData
      const selectFlagEl = this.selectItemEl.querySelector('[data-id=flag]')
      selectFlagEl.className = `currency-select__item-flag flag-${flag}`
      const selectCodeEl = this.selectItemEl.querySelector('[data-id=code]')
      selectCodeEl.textContent = code
      this.#value = currency
    }
  
    #handleDropdownClick (e) {
      const selectedItemEl = e.target.closest('[data-id=dropdown-item]')
  
      if (!selectedItemEl) return null
  
      const { currency } = selectedItemEl.dataset
      this.#selectValue(currency)
      this.#markActive()

      this.onSelectValue(currency)
    }
  
    #initListeners () {
      this.onmouseenter = this.#showDropdown.bind(this)
      this.onmouseleave = this.#hideDropdown.bind(this)
      this.dropdownEl.onclick = this.#handleDropdownClick.bind(this)
    } 
  }

customElements.define('currency-select', CurrencySelect)
