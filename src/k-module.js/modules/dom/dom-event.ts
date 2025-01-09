type Callback = () => void
export function onFocusWindow(callback: Callback) {
    onwindow('focus', callback)
}
export function onBlurWindow(callback: Callback) {
    onwindow('blur', callback)
}
function onwindow(event: string, callback: Callback) {
    window.addEventListener(event, callback)
}