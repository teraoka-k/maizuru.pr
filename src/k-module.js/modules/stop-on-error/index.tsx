import { createSignal } from "solid-js";
import { Error as ErrorMsg } from "../style";
import { getWindowByTitle } from "../tauri";
import { LogicalSize } from "@tauri-apps/api/dpi";

export function NotifyError(props: { windowLabel: string }) {
    var [err, setErr] = createSignal('')
    onError(async e => {
        var window = await getWindowByTitle(props.windowLabel)
        if (window) {
            var size = await window.outerSize()
            if (size.width < 200 && size.height < 200) {
                window.setSize(new LogicalSize(800, 600))
            }
            await Promise.all([window.setFocus(), window.setSkipTaskbar(false)])
        }
        setErr('')
        setErr(e instanceof ErrorEvent ? e.error.stack : e.reason)
    });
    return <ErrorMsg text={err} closeTimeout={1000000}></ErrorMsg>
}

function onError(callback: (e: ErrorEvent | PromiseRejectionEvent) => void) {
    ["error", "unhandledrejection"].forEach(event => window.addEventListener(event as "error", callback))
}
