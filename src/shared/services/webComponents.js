const subscribes = []
let isContentLoaded = false

document.addEventListener("DOMContentLoaded", () => {
    subscribes.forEach(callback => callback())
    isContentLoaded = true
})

export const defineElementOnContentLoaded = (name, webComponent, options) => {
    if (isContentLoaded) {
        customElements.define(name, webComponent, options)
    } else {
        subscribes.push(() => customElements.define(name, webComponent, options))
    }
}
