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
    const isMainMenu = Boolean(e.target.closest('main-menu')) // TODO: use .composedPath()
    const isBurgerMenuButton = Boolean(e.target.closest('animated-button-burger-menu'))
    console.log(e.target, e.composedPath())
    if (!isMainMenu && !isBurgerMenuButton && !MainMenu.hasAttribute('hidden')) {
        closeMenu()
    }
})