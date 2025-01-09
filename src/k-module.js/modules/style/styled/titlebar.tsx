import { getCurrentWindow } from "@tauri-apps/api/window"
import { Button, Label, Row, Window } from "../components"
import { bg, c, centerizeContent, overflowHidden, style } from "../styler"
import { createSignal, Show } from "solid-js"
import { animateColor } from "../../color"
import { onBlurWindow, onFocusWindow } from '../../dom/dom-event'
var color = '#ffffff'
var s = {
    header: style({ height: '24px', background: c(color, .09), zIndex: 100 }),
    title: style({ position: 'fixed', left: '3px', top: '3px', color: c(color, .618), fontSize: '15px', zIndex: 100 }),
    btns: style({ position: 'fixed', gap: '5px', width: '69px', right: 0, padding: '3px', zIndex: 100 }, overflowHidden()),
    btn: style(centerizeContent(), { fontWeight: 10, color: c(color, .618), width: '18px', height: '18px', background: 'transparent', transition: '0.2s', borderRadius: 0, zIndex: 100 })
        .active({ scale: 0.96 }).hover({ scale: 1.1 }),
}
export function Titlebar(props: { title?: string, color?: { focus: string, blur: string }, isMinimizable?: boolean, isMaximizable?: boolean, isClosable?: boolean }) {
    var header = props.color ? s.header.clone().setProps({ background: props.color.blur }) : s.header;
    var [isMaximized, setMax] = createSignal(false);
    (async () => setMax(await getCurrentWindow().isMaximized()))();
    onFocusWindow(() => toggleHighlight(true));
    onBlurWindow(() => toggleHighlight(false));
    function toggleHighlight(isHighlight: boolean) {
        var duration = 382;
        [s.title, s.btn].forEach(s => s.animateEaseInOut(duration, { color: c(color, isHighlight ? 1 : .618) }))
        if (!props.color)
            header.animateEaseInOut(duration, bg(color, isHighlight ? .146 : .09))
        else {
            var [from, to] = isHighlight ? [props.color.blur, props.color.focus] : [props.color.focus, props.color.blur]
            animateColor(from, to, duration, color => header.setProps({ background: color }))
        }
    }
    return <>
        <Window style={header} onmousedown={() => getCurrentWindow().startDragging()}></Window>
        <Show when={props.title}>
            <Label style={s.title}>{props.title}</Label>
        </Show>
        <Row style={s.btns}>
            <Show when={props.isMinimizable ?? true}>
                <Button style={s.btn} onclick={() => getCurrentWindow().minimize()}>&minus;</Button>
            </Show>
            <Show when={props.isMaximizable ?? true}>
                <Button style={s.btn} onclick={async () => {
                    var w = getCurrentWindow();
                    await w.toggleMaximize()
                    setMax(await w.isMaximized())
                }}>
                    <Show when={isMaximized()}>&#10064;</Show>
                    <Show when={!isMaximized()}>&#8414;</Show>
                </Button>
            </Show>
            <Show when={props.isClosable ?? true}>
                <Button style={s.btn} onclick={() => getCurrentWindow().hide()}>&#128473;</Button>
            </Show>
        </Row>
    </>
}