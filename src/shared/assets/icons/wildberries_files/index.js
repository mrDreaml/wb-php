await customElements.whenDefined('shadow-area')

const ShadowArea = document.querySelector('shadow-area')

document.addEventListener('mousedown', e => {
    const isProductSearch = Boolean(e.target.closest('product-search-input'))
    const isMainMenu = Boolean(e.target.closest('main-menu'))
    const isBurgerMenuButton = Boolean(e.target.closest('animated-button-burger-menu'))
    if (!isProductSearch && !isMainMenu && !isBurgerMenuButton) {
        ShadowArea.hide()
        return
    }
})