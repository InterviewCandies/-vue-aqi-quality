export function debounce(fn, timer) {
    let timeout = null

    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, timer);
    }
}