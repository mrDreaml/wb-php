export const mockRequest = (callback, delay) => (...params) => new Promise((res, rej) => {
    setTimeout(() => {
        try {
            res(callback(...params))
        } catch (e) {
            rej(e)
        }
    }, delay)
})
