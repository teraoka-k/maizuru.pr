import { invoke } from '@tauri-apps/api/core'
import { centerizeContent, column, Column, flex, InputText, Row, style, Window } from '..'
import { createSignal, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Toggle } from '../tauri/window';
import { overflowScrollInto, overflowYVisible } from '../dom/dom-animate';

export function Launcher(props: { title: string, shellCmd?: string, getOptionsCmd: string, suffix?: string, toggle: Toggle, color?: string, backgroundColor?: string, ref?: HTMLDivElement }) {
    var [options, setOptions] = createStore(['']);
    var [filter, setFilter] = createSignal('');
    var [focus, _setFocus] = createSignal(0);
    var inputElement: HTMLInputElement
    var columnElement: HTMLDivElement

    var animation: number;
    function setFocus(newFocus: number) {
        if (focus() == newFocus) {
            return
        }
        _setFocus(newFocus)
        if (!overflowYVisible(columnElement, columnElement.children[newFocus] as HTMLElement)) {
            animation = overflowScrollInto({
                container: columnElement, content: columnElement.children[newFocus] as HTMLElement,
                total_time_in_ms: 120,
                animationToOverride: animation
            })
        }
    }

    async function updateOptions() {
        setOptions(await invoke(props.getOptionsCmd));
    }

    function clear() {
        invoke('launcher_clear')
        setFilter('')
        updateOptions()
    }

    props.toggle.setOnShow(async () => {
        updateOptions()
        inputElement.focus()
    })

    return <>
        {props.toggle.isVisible() &&
            <Window ref={props.ref} style={style(flex(), centerizeContent(), { width: '50%', height: '60%', color: props.color, background: props.backgroundColor, borderRadius: '10%' })}>
                <Column style={style(column(), { overflow: 'hidden' })}>
                    <h1 class={style(centerizeContent()).class}>{props.title}</h1>
                    <Row style={style(centerizeContent(), { overflow: 'hidden' })}>
                        <InputText placeholder='filter'
                            /* @ts-ignore */
                            ref={inputElement}
                            value={filter()}
                            oninput={setFilter}
                            onchar={async char => {
                                setOptions(await invoke('launcher_filter', { char }))
                                setFocus(0)
                            }}
                            onenter={() => {
                                invoke('launcher_launch', { option: options[focus()] + (props.suffix ?? ''), cmd: props.shellCmd })
                                clear()
                                props.toggle.hide()
                            }}
                            onback={clear}
                            ondown={() => setFocus(Math.min(focus() + 1, options.length - 1))}
                            onup={() => setFocus(Math.max(0, focus() - 1))}
                        ></InputText>
                    </Row>
                    <Column
                        /* @ts-ignore */
                        ref={columnElement}
                        style={style(column(), { fontSize: '1.5em', overflow: 'hidden' })}>
                        <For each={options}>{(option, i) =>
                            <p style={{ width: 'max-content', "background-color": i() == focus() ? 'aqua' : 'inherit', "align-self": 'center', "margin": 0, "border-radius": "10%", padding: '0 1%' }}>
                                {option}
                            </p>}
                        </For>
                    </Column>
                </Column>
            </Window >
        }
    </>
}