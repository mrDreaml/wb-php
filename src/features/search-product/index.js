import { getSearchProductSuggestions } from '/src/shared/services/api/index.js'

const searchProductSuggestions = getSearchProductSuggestions()

const ProductSearchInput = document.querySelector('main-header').shadowRoot.querySelector('product-search-input')
const ShadowArea = document.querySelector('shadow-area')

ProductSearchInput.searchSuggestionsPromise = searchProductSuggestions
ProductSearchInput.onSaveSearchedValues = (searchedValues) => {
    localStorage.setItem("searched-values", JSON.stringify(searchedValues));
}
ProductSearchInput.onReadSearchedValues = () => {
    return JSON.parse(localStorage.getItem("searched-values") || "[]");
}

ProductSearchInput.onShowDropdown = () => {
    ShadowArea.show()
}

ProductSearchInput.onHideDropdown = async () => {
    ShadowArea.hide()
}

document.addEventListener('mousedown', e => {
    const isProductSearch = Boolean(e.target.closest('product-search-input'))

    if (!isProductSearch && ProductSearchInput.checkDropdownOpened()) {
        ProductSearchInput.hideDropdown()
    }
})