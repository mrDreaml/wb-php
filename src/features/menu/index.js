await customElements.whenDefined('main-menu')
await customElements.whenDefined('animated-button-burger-menu')
await customElements.whenDefined('shadow-area')

const MainMenu = document.querySelector('main-menu')
const BurgerMenuButton = document.querySelector('animated-button-burger-menu')
const MainHeaderEl = document.querySelector('main-header header')
const body = document.querySelector('body')
const ShadowArea = document.querySelector('shadow-area')

MainMenu.onCalcPosition = () => {
    const { height } = MainHeaderEl.getBoundingClientRect()

    return {
        top: `${height}px`,
    }
}

const closeMenu = async () => {
    MainMenu.setAttribute('hidden', '')
    BurgerMenuButton.close()
    body.classList.remove('no-scroll')
}

BurgerMenuButton.onToggleBurgerMenu = (isOpened) => {
    if (isOpened) {
        body.classList.add('no-scroll')
        MainMenu.removeAttribute('hidden')
        ShadowArea.show()
    } else {
        closeMenu()
        ShadowArea.hide()
    }
}

document.addEventListener('mousedown', e => {
    const isMainMenu = Boolean(e.target.closest('main-menu'))
    const isBurgerMenuButton = Boolean(e.target.closest('animated-button-burger-menu'))
    if (!isMainMenu && !isBurgerMenuButton && !MainMenu.hasAttribute('hidden')) {
        closeMenu()
    }
})