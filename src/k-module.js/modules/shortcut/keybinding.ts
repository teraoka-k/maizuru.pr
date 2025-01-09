import { invoke } from "@tauri-apps/api/core";
import { ShortcutKey } from ".";
import { emit, listen } from "@tauri-apps/api/event";

export type Command = () => void;

export class KeyBinding {
    name: string
    private unlisten?: () => void

    private get event() {
        return `keybinding-${this.apiName}`
    }

    constructor(public key: ShortcutKey, public apiName: string, private command?: Command) {
        this.name = getHumanReadableNameByAPI(apiName)
    }

    executeCommand() {
        this.command?.() ?? invoke(this.apiName)
        emit(this.event)
    }

    async addOnExecute(callback: () => void) {
        this.unlisten = await listen(this.event, () => callback())
    }

    removeOnExecute() {
        this.unlisten?.()
    }

    async register() {
        await this.key.register(() => this.executeCommand());
    }

}

function getHumanReadableNameByAPI(apiName: string): string {
    switch (apiName) {
        case 'background_set': return 'Set Background'
        case 'background_remove': return 'Remove Background'
        case 'background_toggle': return 'Toggle Desktop'
        case 'exit': return 'Exit'
        case 'window_close': return 'Close'
        case 'window_maximize': return 'Maximize'
        case 'window_maximize_super': return 'Super Maximize (Dual Monitors)'
        case 'window_centerize': return 'Centerize'
        case 'window_focus_right': return 'Focus Right'
        case 'window_focus_left': return 'Focus Left'
        case 'window_focus_up': return 'Focus Up'
        case 'window_focus_down': return 'Focus Down'
        case 'window_move_right': return 'Move Right'
        case 'window_move_left': return 'Move Left'
        case 'window_move_up': return 'Move Up'
        case 'window_move_down': return 'Move Down'
        case 'window_size_w_up': return 'Width (+)'
        case 'window_size_w_down': return 'Width (-)'
        case 'window_size_h_up': return 'Height (+)'
        case 'window_size_h_down': return 'Height (-)'
        case 'space_go_down': return 'Go Down'
        case 'space_go_up': return 'Go Up'
        case 'space_go_left': return 'Go Left'
        case 'space_go_right': return 'Go Right'
        case 'settings': return 'Keyboard Shortcuts'
        default: return ''
    }
}
