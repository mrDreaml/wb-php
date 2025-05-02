export const throttle = (callback, delay) => {
    let t = null
    let lastCallT = -1

    return (...params) => {
        if (lastCallT === -1 || performance.now() - lastCallT > delay) {
            lastCallT = performance.now()
            callback(params)
            clearTimeout(t)
            return
        }

        clearTimeout(t)
        t = setTimeout(() => {
            lastCallT = performance.now()
            callback(params)
        }, delay)
    }
}

