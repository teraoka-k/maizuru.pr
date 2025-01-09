import { isRegistered, register, ShortcutHandler, unregister } from "@tauri-apps/plugin-global-shortcut";
import { isMeta, Key } from "./keys";

export enum Modifier {
    None = 0,
    Ctrl = 1 << 1,
    Shift = 1 << 2,
    Alt = 1 << 3,
    Super = 1 << 4,
}

export class ShortcutKey {

    static from(keys: Key[]): ShortcutKey {
        var shortcut = new ShortcutKey()
        keys.forEach(key => shortcut.setKey(key))
        return shortcut
    }

    modifier: Modifier = Modifier.None;
    customModifier?: Key

    constructor(public key?: Key) { }

    async register(ondown: ShortcutHandler, onup?: ShortcutHandler) {
        await register(this.toString(), async e => {
            switch (e.state) {
                case "Pressed":
                    return ondown(e);
                case "Released":
                    onup?.(e)
            }
        });
    }

    async unregister() {
        var key = this.toString()
        if (await isRegistered(key)) {
            await unregister(key)
        }
    }

    setModifier(modifier: Modifier) {
        this.modifier = modifier
        return this
    }

    setKey(key: Key) {
        if (isMeta(key))
            this.setModifierByKey(key)
        else if (!this.customModifier && this.key !== key) {
            this.customModifier = this.key
            this.key = key
        } else {
            this.key = key
        }
        return this
    }

    copyModifier(from: ShortcutKey) {
        this.modifier = from.modifier
        this.customModifier = from.customModifier
        return this
    }

    clear() {
        delete this.key
        delete this.customModifier
        this.modifier = Modifier.None
    }

    clone() {
        return new ShortcutKey(this.key).copyModifier(this)
    }

    setCustomMod(mod: Key) {
        this.customModifier = mod
        return this
    }

    equals(key: ShortcutKey): boolean {
        return this.key === key.key && this.modifier === key.modifier && this.customModifier === key.customModifier
    }

    toString(forAPI = true) {
        var keys = []
        if (this.modifier & Modifier.Alt)
            keys.push(Key.alt)
        if (this.modifier & Modifier.Ctrl)
            keys.push(Key.ctrl)
        if (this.modifier & Modifier.Shift)
            keys.push(Key.shift)
        if (this.modifier & Modifier.Super)
            keys.push(Key.super)
        if (!forAPI && this.customModifier)
            keys.push(this.customModifier)
        if (this.key)
            keys.push(this.key)
        return keys.join('+')
    }

    print() {
        return this.toString(false)
            .replace(/KEY/g, '')
            .replace('SHIFT', 'Shift')
            .replace('CONTROL', 'Ctrl')
            .replace('ALT', 'Alt')
            .replace('SUPER', 'Win')
            .replace('ARROWRIGHT', '→')
            .replace('ARROWLEFT', '←')
            .replace('ARROWDOWN', '↓')
            .replace('ARROWUP', '↑')
            .replace('NUMPAD', '')
            .replace('DIGIT', '')
            .replace('QUOTE', "'")
            .replace('SEMICOLON', ';')
            .replace('COLON', ':')
            .replace('SLASH', '/')
            .replace('COMMA', ',')
            .replace('EQUAL', '=')
            .replace('MINUS', '-')
            .replace('PERIOD', '.')
            .replace('SLASH', '/')
            .replace(/\+/g, ' + ')
    }

    private setModifierByKey(key: Key) {
        if (key == Key.ctrl)
            this.modifier |= Modifier.Ctrl
        if (key == Key.shift)
            this.modifier |= Modifier.Shift
        if (key == Key.alt)
            this.modifier |= Modifier.Alt
        if (key == Key.super)
            this.modifier |= Modifier.Super

    }


}

export function keyBackquote() {
    return key(Key.backquote)
}
export function keyBackslash() {
    return key(Key.backslash)
}
export function keyBracketLeft() {
    return key(Key.bracketLeft)
}
export function keyBracketRight() {
    return key(Key.bracketRight)
}
export function keyComma() {
    return key(Key.comma)
}
export function keyN0() {
    return key(Key.n0)
}
export function keyN1() {
    return key(Key.n1)
}
export function keyN2() {
    return key(Key.n2)
}
export function keyN3() {
    return key(Key.n3)
}
export function keyN4() {
    return key(Key.n4)
}
export function keyN5() {
    return key(Key.n5)
}
export function keyN6() {
    return key(Key.n6)
}
export function keyN7() {
    return key(Key.n7)
}
export function keyN8() {
    return key(Key.n8)
}
export function keyN9() {
    return key(Key.n9)
}
export function keyEq() {
    return key(Key.eq)
}
export function keyA() {
    return key(Key.a)
}
export function keyB() {
    return key(Key.b)
}
export function keyC() {
    return key(Key.c)
}
export function keyD() {
    return key(Key.d)
}
export function keyE() {
    return key(Key.e)
}
export function keyF() {
    return key(Key.f)
}
export function keyG() {
    return key(Key.g)
}
export function keyH() {
    return key(Key.h)
}
export function keyI() {
    return key(Key.i)
}
export function keyJ() {
    return key(Key.j)
}
export function keyK() {
    return key(Key.k)
}
export function keyL() {
    return key(Key.l)
}
export function keyM() {
    return key(Key.m)
}
export function keyN() {
    return key(Key.n)
}
export function keyO() {
    return key(Key.o)
}
export function keyP() {
    return key(Key.p)
}
export function keyQ() {
    return key(Key.q)
}
export function keyR() {
    return key(Key.r)
}
export function keyS() {
    return key(Key.s)
}
export function keyT() {
    return key(Key.t)
}
export function keyU() {
    return key(Key.u)
}
export function keyV() {
    return key(Key.v)
}
export function keyW() {
    return key(Key.w)
}
export function keyX() {
    return key(Key.x)
}
export function keyY() {
    return key(Key.y)
}
export function keyZ() {
    return key(Key.z)
}
export function keyMinus() {
    return key(Key.minus)
}
export function keyPeriod() {
    return key(Key.period)
}
export function keyQuote() {
    return key(Key.quote)
}
export function keySemi() {
    return key(Key.semi)
}
export function keyColon() {
    return key(Key.colon)
}
export function keySlash() {
    return key(Key.slash)
}
export function keyBackspace() {
    return key(Key.backspace)
}
export function keyCaps() {
    return key(Key.caps)
}
export function keyEntr() {
    return key(Key.entr)
}
export function keySpace() {
    return key(Key.space)
}
export function keyTab() {
    return key(Key.tab)
}
export function keyDelete() {
    return key(Key.delete)
}
export function keyEnd() {
    return key(Key.end)
}
export function keyHome() {
    return key(Key.home)
}
export function keyInsert() {
    return key(Key.insert)
}
export function keyPageDown() {
    return key(Key.pageDown)
}
export function keyPageUp() {
    return key(Key.pageUp)
}
export function keyPrint() {
    return key(Key.print)
}
export function keyScrollLock() {
    return key(Key.scrollLock)
}
export function keyArrowDown() {
    return key(Key.arrowDown)
}
export function keyArrowLeft() {
    return key(Key.arrowLeft)
}
export function keyArrowRight() {
    return key(Key.arrowRight)
}
export function keyArrowUp() {
    return key(Key.arrowUp)
}
export function keyNumLock() {
    return key(Key.numLock)
}
export function keyNumpad0() {
    return key(Key.numpad0)
}
export function keyNumpad1() {
    return key(Key.numpad1)
}
export function keyNumpad2() {
    return key(Key.numpad2)
}
export function keyNumpad3() {
    return key(Key.numpad3)
}
export function keyNumpad4() {
    return key(Key.numpad4)
}
export function keyNumpad5() {
    return key(Key.numpad5)
}
export function keyNumpad6() {
    return key(Key.numpad6)
}
export function keyNumpad7() {
    return key(Key.numpad7)
}
export function keyNumpad8() {
    return key(Key.numpad8)
}
export function keyNumpad9() {
    return key(Key.numpad9)
}
export function keyNumpadAdd() {
    return key(Key.numpadAdd)
}
export function keyNumpadDecimal() {
    return key(Key.numpadDecimal)
}
export function keyNumpadDivide() {
    return key(Key.numpadDivide)
}
export function keyNumpadEnter() {
    return key(Key.numpadEnter)
}
export function keyNumpadEqual() {
    return key(Key.numpadEqual)
}
export function keyNumpadMultiply() {
    return key(Key.numpadMultiply)
}
export function keyNumpadSubtract() {
    return key(Key.numpadSubtract)
}
export function keyEsc() {
    return key(Key.esc)
}
export function keyF1() {
    return key(Key.f1)
}
export function keyF2() {
    return key(Key.f2)
}
export function keyF3() {
    return key(Key.f3)
}
export function keyF4() {
    return key(Key.f4)
}
export function keyF5() {
    return key(Key.f5)
}
export function keyF6() {
    return key(Key.f6)
}
export function keyF7() {
    return key(Key.f7)
}
export function keyF8() {
    return key(Key.f8)
}
export function keyF9() {
    return key(Key.f9)
}
export function keyF10() {
    return key(Key.f10)
}
export function keyF11() {
    return key(Key.f11)
}
export function keyF12() {
    return key(Key.f12)
}
export function keyAudioVolumeDown() {
    return key(Key.audioVolumeDown)
}
export function keyAudioVolumeUp() {
    return key(Key.audioVolumeUp)
}
export function keyAudioVolumeMute() {
    return key(Key.audioVolumeMute)
}
export function keyMediaPlay() {
    return key(Key.mediaPlay)
}
export function keyMediaPause() {
    return key(Key.mediaPause)
}
export function keyMediaPlayPause() {
    return key(Key.mediaPlayPause)
}
export function keyMediaStop() {
    return key(Key.mediaStop)
}
export function keyMediaTrackNext() {
    return key(Key.mediaTrackNext)
}
export function keyMediaTrackPrevious() {
    return key(Key.mediaTrackPrevious)
}
export function keyF13() {
    return key(Key.f13)
}
export function keyF14() {
    return key(Key.f14)
}
export function keyF15() {
    return key(Key.f15)
}
export function keyF16() {
    return key(Key.f16)
}
export function keyF17() {
    return key(Key.f17)
}
export function keyF18() {
    return key(Key.f18)
}
export function keyF19() {
    return key(Key.f19)
}
export function keyF20() {
    return key(Key.f20)
}
export function keyF21() {
    return key(Key.f21)
}
export function keyF22() {
    return key(Key.f22)
}
export function keyF23() {
    return key(Key.f23)
}
export function keyF24() {
    return key(Key.f24)
}

function key(keyCode: Key): ShortcutKey {
    return new ShortcutKey(keyCode)
}
