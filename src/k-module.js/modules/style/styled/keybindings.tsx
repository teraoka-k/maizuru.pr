import { createSignal, For } from "solid-js";
import { bg, blur, Button, c, Column, grad, gradRadial, image, InputText, Label, overflowHidden, Row, scrollbar, style, Window } from "..";
import { jsToKey, ShortcutKey, KeyBinding } from "../../";
import { unregisterAll } from "@tauri-apps/plugin-global-shortcut";

var base = '#1a191f'
var focus = '#ffffff'
scrollbar({ width: '13px' }, gradRadial(focus, .146), gradRadial(focus, .618, 55));
var s = {
    container: style(bg(base)),
    bg: style(image('/keyboard.jpg'), { filter: 'brightness(.5) blur(3px)' }),
    middle: style(grad(focus, 0.618, 8), { width: '13vw', left: '40vw' }, blur(34)),
    column: style({
        position: 'fixed', display: 'block', left: '8vw', top: 'calc(21px + 5vh)', width: '84vw', height: '90vh', overflowY: 'auto'
    }),
    row: style({ gap: '0.618%', width: '98%', height: '34px', padding: '1px 0 ' }, overflowHidden()),
    name: style(grad(focus, 0.146), { color: c(focus), width: '48%', padding: '1%' }),
    key: style(grad(focus, 0.146), { width: '48%', padding: '1%', border: 'none', color: c(base, 1), fontWeight: 'bold', transition: '0.2s', outline: '#000 auto 0' })
        .hover({ scale: '1.1' }),
    button: style(grad(focus, 0.146, 50), { color: c(focus, 0.618), borderRadius: 0, transition: '0.2s' })
        .active({ scale: 0.99 })
        .hover({ scale: '1.1' })
}

interface Props {
    reset: (isChanged: boolean) => void
}

export function KeyBindings(props: { keybindings: KeyBinding[] } & Props) {
    return <>
        <Window style={s.container}>
            <Window style={s.bg}></Window>
            <Window style={s.middle}></Window>
            <Column style={s.column}>
                <For each={props.keybindings}>{(keybinding) =>
                    <Row style={s.row}>
                        <Label style={s.name}>{keybinding.name}</Label>
                        <KeyInput keybinding={keybinding} reset={props.reset}></KeyInput>
                    </Row>
                }</For>
            </Column>
        </Window>
    </>
}

function KeyInput(props: { keybinding: KeyBinding } & Props) {
    var restoreKey = props.keybinding.key;
    var [key, setKey] = createSignal(restoreKey.print())
    var newKey = new ShortcutKey()
    var isDown: { [key: string]: boolean } = {};
    function restore() {
        setKey(restoreKey.print())
        props.keybinding.key = restoreKey
        newKey.clear()
    }
    return <>
        <InputText style={s.key} value={key}
            onkeydownraw={e => {
                e.preventDefault();
                isDown[e.code] = true
                newKey.setKey(jsToKey(e.code))
                props.keybinding.key = newKey
                setKey(newKey.print())
            }}
            onfocus={() => {
                // make sure onfocus occurs after onblur even in case of promise
                setTimeout(async () => {
                    setKey('')
                    await unregisterAll()
                }, 100)
            }}
            onblur={async () => {
                try { await newKey.unregister() }
                catch (e) { }
                var isEmpty = !key()
                if (isEmpty)
                    restore()
                props.reset?.(!isEmpty)
            }}
        ></InputText>
        <Button style={s.button} onclick={() => {
            setKey('')
            isDown = {}
            newKey.clear()
            props.keybinding.key = newKey
            props.reset?.(true)
        }}>clear</Button>
        <Button style={s.button} onclick={() => {
            restore()
            props.reset?.(true)
        }}>restore</Button>
    </>
}

