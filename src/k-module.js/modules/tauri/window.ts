import { invoke } from "@tauri-apps/api/core";
import { Accessor, createSignal, Setter } from "solid-js";
import { keyEsc } from "../shortcut/global-shortcut-key";
import { getAllWindows, getCurrentWindow, Window } from "@tauri-apps/api/window";
import { getAllWebviewWindows, WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { WindowOptions } from "@tauri-apps/api/window";
import { WebviewOptions } from "@tauri-apps/api/webview";

export async function createWindow(label: string, url: string, options?: Omit<WebviewOptions, 'x' | 'y' | 'width' | 'height'> & WindowOptions): Promise<WebviewWindow> {
    return new Promise((resolve, _) => {
        var window = new WebviewWindow(label, { url, ...options })
        window.once('tauri://created', () => resolve(window));
    })
}

export async function getWindowByTitle(title: string): Promise<Window | null> {
    for (let window of await getAllWindows())
        if (await window.title() == title)
            return window
    return null
}

export async function getWindowByLabel(label: string): Promise<WebviewWindow | null> {
    for (let w of await getAllWebviewWindows())
        if (w.label == label)
            return w
    return null
}

export async function show() {
    await invoke('window_show');
}

export async function hide() {
    await invoke('window_hide');
}

export async function maximize() {
    await invoke('window_maximize');
}

export class Toggle {
    isVisible: Accessor<boolean>

    private setIsVisible: Setter<boolean>
    private onShow?: () => void

    constructor() {
        [this.isVisible, this.setIsVisible] = createSignal(false)
    }

    setOnShow(callback: () => void) {
        this.onShow = callback;
    }

    async show() {
        await getCurrentWindow().show();
        // keyEsc().register(
        //     () => this.hide(),
        //     () => keyEsc().unregister(),
        // );
        this.setIsVisible(true)
        this.onShow?.()
    }

    hide() {
        this.setIsVisible(false)
        keyEsc().unregister();
        hide()
    }

}
