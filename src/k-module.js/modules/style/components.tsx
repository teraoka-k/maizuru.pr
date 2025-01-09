import { Accessor, createEffect, JSXElement } from "solid-js";
import { Ease, Style } from "./style";
import { button, column, grad, label, message, row, style, window } from "./styler";

interface Props<T extends HTMLElement = HTMLDivElement> {
    children?: JSXElement
    style?: Style
    class?: string
    ref?: T
    onmousedown?: (e: MouseEvent) => void
    onclick?: () => void
    ondblclick?: () => void
    onanimationend?: () => void
}

var ws = style(window())
export function Window(props: Props) {
    return Div(props, ws)
}

var bs = style(button())
export function Button(props: Props) {
    return <button class={join(props, bs)} onclick={props.onclick}>{props.children}</button>
}

var rs = style(row())
export function Row(props: Props) {
    return Div(props, rs)
}

var cs = style(column())
export function Column(props: Props) {
    return Div(props, cs)
}

var ls = style(label())
export function Label(props: Props) {
    return Div(props, ls)
}

export function Div(props: Props, defaultStyle: Style) {
    return <div class={[props.class, join(props, defaultStyle)].filter(c => c).join(' ')}
        ref={props.ref}
        onmousedown={props.onmousedown}
        onclick={props.onclick}
        ondblclick={props.ondblclick}
        onanimationend={props.onanimationend}
    >{props.children}</div>
}

function join(props: Props, defaultStyle?: Style) {
    if (!props.style) {
        return defaultStyle?.class ?? ''
    } else if (defaultStyle?.props) {
        var cssprops = props.style.props;
        Object.keys(defaultStyle.props).forEach(key => {
            // @ts-ignore
            if (cssprops[key] === undefined || cssprops[key] === '') {
                // @ts-ignore
                cssprops[key] = defaultStyle.props[key]
            }
        })
        props.style.setProps(cssprops);
        return props.style.class
    }
    return (props.style?.setProps(defaultStyle?.props ?? {}) ?? defaultStyle)?.class ?? ''
}

interface InputProps<T> extends Props {
    ref?: HTMLInputElement
    value?: Accessor<T>
    placeholder?: string
    oninput?: (text: T) => void
    onkeydownraw?: (e: KeyboardEvent & { currentTarget: HTMLInputElement, target: Element }) => void
    onenter?: () => void
    onesc?: () => void
    onback?: () => void
    onup?: () => void
    ondown?: () => void
    /** called only for keydowns that are not incluede in `[ent, esc, del, back, up, down]` */
    onchar?: (char: string) => void
    /** called for every keydown */
    onanychar?: (char: string) => void
    onfocus?: () => void
    onblur?: () => void
}

var is = style({})
export function InputText(props: Props & InputProps<string>) {
    return <input
        class={join(props, is)}
        ref={props.ref}
        type="text"
        value={props.value?.() ?? ''}
        placeholder={props.placeholder ?? ''}
        oninput={e => {
            props.oninput?.(e.currentTarget.value)
        }}
        onkeydown={e => {
            props.onkeydownraw?.(e)
            onkeydown(e, props)
        }}
        onfocus={props.onfocus}
        onblur={props.onblur}
    >{props.children}</input>
}

export function InputNumber(props: Props & InputProps<number>) {
    return <input
        class={join(props, is)}
        ref={props.ref}
        type="number"
        value={props.value?.() ?? ''}
        placeholder={props.placeholder ?? ''}
        oninput={e => props.oninput?.(Number(e.currentTarget.value))}
        onkeydown={e => onkeydown(e, props)}
    >{props.children}</input>
}

interface MsgProps {
    text: Accessor<string>,
    style?: Style
    closeTimeout?: number
}
var smi = style(grad('#f0f0f0', 1), message('#101010'))
export function Info(props: MsgProps) {
    return <Message text={props.text} style={smi} closeTimeout={props.closeTimeout}></Message>
}
var sme = style(grad('#806040'), message('#000000'))
export function Error(props: MsgProps) {
    return <Message text={props.text} style={sme} closeTimeout={props.closeTimeout}></Message>
}
function Message(props: MsgProps) {
    var animate = props.style?.animateSequence([
        [Ease.InOut, { transition: '0s', opacity: 0, width: 0, left: '110vw', top: '5vh' }, 20],
        [Ease.InOut, { opacity: 1, left: '21vw', width: '55vw' }, 200],
        [Ease.In, { left: '15vw', width: '65vw' }, props.closeTimeout ?? 800],
        [Ease.In, { opacity: 0, left: '0vw', width: 0 }, 120],
    ])
    createEffect(() => {
        if (props.text()) {
            animate?.();
        }
    })
    return <Window style={props.style}>{props.text()}</Window>
}

function onkeydown<T>(e: KeyboardEvent, props: InputProps<T>) {
    props.onanychar?.(e.key)
    switch (e.key) {
        case 'Enter':
            props.onenter?.()
            break
        case 'Escape':
            props.onesc?.()
            break;
        case 'Delte':
        case 'Backspace':
            props.onback?.()
            break;
        case "ArrowDown":
            props.ondown?.()
            break;
        case "ArrowUp":
            props.onup?.()
            break;
        default:
            props.onchar?.(e.key)
            break
    }
}