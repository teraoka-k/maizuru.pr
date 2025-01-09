import { onMount } from 'solid-js';
import { centerizeContent, style, Window, window } from '..';
import { getCurrentWindow } from '@tauri-apps/api/window';

export function FullScreen(props: { children: any }) {
    onMount(async () => {
        var w = getCurrentWindow()
        await Promise.all([w.setFullscreen(true), w.setAlwaysOnBottom(true)])
        await w.show();
    });
    return <Window style={style(window(), { background: 'transparent' }, centerizeContent())}>{props.children}</Window>
}