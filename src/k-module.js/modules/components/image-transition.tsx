import { Accessor, createEffect } from "solid-js";
import { image, Keyframes, style, Window } from "..";
import { CSSProperties } from "react";

const DURATION_MS = 1000;
export enum Transition {
    None = 'none',
    Fade = 'fade',
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

const IN = 'in'
const OUT = 'out'

function faded(props: CSSProperties): CSSProperties {
    return { opacity: 0.618, ...props }
}
function opaque(props: CSSProperties): CSSProperties {
    return { opacity: 1, ...props }
}

const FADEIN: Keyframes = { 0: { opacity: 0 }, 100: { opacity: 1 } };
const FADEOUT: Keyframes = { 0: { opacity: 1 }, 100: { opacity: 0 } };
const DOWNIN: Keyframes = { 0: faded({ top: '-100vh' }), 100: opaque({ top: 0 }) }
const DOWNOUT: Keyframes = { 0: opaque({ top: 0 }), 100: faded({ top: '100vh' }) }
const UPIN: Keyframes = { 0: faded({ top: '100vh' }), 100: opaque({ top: 0 }) }
const UPOUT: Keyframes = { 0: opaque({ top: 0 }), 100: faded({ top: '-100vh' }) }
const LEFTIN: Keyframes = { 0: faded({ left: '100vw' }), 100: opaque({ left: 0 }) }
const LEFTOUT: Keyframes = { 0: opaque({ left: 0 }), 100: faded({ left: '-100vw' }) }
const RIGHTIN: Keyframes = { 0: faded({ left: '-100vw' }), 100: opaque({ left: 0 }) }
const RIGHTOUT: Keyframes = { 0: opaque({ left: 0 }), 100: faded({ left: '100vw' }) }

var base = style(image(''), { position: 'fixed' });
var s = {
    in: base.setProps({ animationName: IN }).keyframe(IN, FADEIN),
    out: base.clone().setProps({ animationName: OUT }).keyframe(OUT, FADEOUT),
}

interface Props {
    image: Accessor<string>;
    transition: Accessor<Transition>;
    durationMs?: Accessor<number>;
    oncomplete?: () => void;
}

export function ImageTransition(props: Props) {
    [s.in, s.out].forEach(style => style.setProps({ animationDuration: `${props.durationMs?.() ?? DURATION_MS}ms` }))
    var currentImage = '';
    var skipsAnimation = false;
    createEffect(() => [s.in, s.out].forEach(style => style.setProps({ animationDuration: `${props.durationMs?.() ?? DURATION_MS}ms` })))
    createEffect(() => {
        var keyframes = getKeyFrames(props.transition())
        skipsAnimation = keyframes === null;
        if (keyframes) {
            s.in.keyframe(IN, keyframes[0], true)
            s.out.keyframe(OUT, keyframes[1], true)
        }
    })
    createEffect(() => {
        if (!skipsAnimation) {
            s.in.setProps({ animationName: IN })
            s.out.setProps({ animationName: OUT })
        }
        s.in.setProps({ backgroundImage: `url(${props.image()})` });
        s.out.setProps({ backgroundImage: `url(${currentImage})` });
        currentImage = props.image();
    });

    function onAnimationEnd() {
        [s.in, s.out].forEach(style => style.setProps({ animationName: 'none' }))
        s.out.setProps({ backgroundImage: `url(${props.image()})` });
        props.oncomplete?.();
    }

    return <Window style={style({ background: 'transparent' })}>
        <Window style={s.in} onanimationend={onAnimationEnd}></Window>
        <Window style={s.out}></Window>
    </Window>
}

function getKeyFrames(transition: Transition): [Keyframes, Keyframes] | null {
    switch (transition) {
        case Transition.Down: return [DOWNIN, DOWNOUT]
        case Transition.Up: return [UPIN, UPOUT]
        case Transition.Left: return [LEFTIN, LEFTOUT]
        case Transition.Right: return [RIGHTIN, RIGHTOUT]
        case Transition.Fade: return [FADEIN, FADEOUT]
        case Transition.None: return null
    }
}