const MainMenu = document.querySelector('main-menu')
const MainHeader = document.querySelector('main-header')
const BurgerMenuButton = MainHeader.shadowRoot.querySelector('animated-button-burger-menu')
const MainHeaderEl = MainHeader.shadowRoot.querySelector('header')
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
    document.body.classList.remove('no-scroll')
}

BurgerMenuButton.onToggleBurgerMenu = (isOpened) => {
    if (isOpened) {
        document.body.classList.add('no-scroll')
        MainMenu.removeAttribute('hidden')
        ShadowArea.show()
    } else {
        closeMenu()
        ShadowArea.hide()
    }
}

document.addEventListener('mousedown', e => {
    const composedPath = e.composedPath()
    if (!MainMenu.hasAttribute('hidden') && !composedPath.some(el => ['ANIMATED-BUTTON-BURGER-MENU', 'MAIN_MENU'].includes(el.tagName))) {
        closeMenu()
    }
})