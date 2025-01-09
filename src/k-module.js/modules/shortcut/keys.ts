export enum Key {
    shift = 'SHIFT',
    ctrl = 'CONTROL',
    alt = 'ALT',
    super = 'SUPER',
    /** ` */
    backquote = 'BACKQUOTE',
    /** \ */
    backslash = 'BACKSLASH',
    /**[ */
    bracketLeft = 'BRACKETLEFT',
    /**] */
    bracketRight = 'BRACKETRIGHT',
    comma = 'COMMA',
    n0 = 'DIGIT0',
    n1 = 'DIGIT1',
    n2 = 'DIGIT2',
    n3 = 'DIGIT3',
    n4 = 'DIGIT4',
    n5 = 'DIGIT5',
    n6 = 'DIGIT6',
    n7 = 'DIGIT7',
    n8 = 'DIGIT8',
    n9 = 'DIGIT9',
    eq = 'EQUAL',
    a = 'KEYA',
    b = 'KEYB',
    c = 'KEYC',
    d = 'KEYD',
    e = 'KEYE',
    f = 'KEYF',
    g = 'KEYG',
    h = 'KEYH',
    i = 'KEYI',
    j = 'KEYJ',
    k = 'KEYK',
    l = 'KEYL',
    m = 'KEYM',
    n = 'KEYN',
    o = 'KEYO',
    p = 'KEYP',
    q = 'KEYQ',
    r = 'KEYR',
    s = 'KEYS',
    t = 'KEYT',
    u = 'KEYU',
    v = 'KEYV',
    w = 'KEYW',
    x = 'KEYX',
    y = 'KEYY',
    z = 'KEYZ',
    /** - */
    minus = 'MINUS',
    /** . */
    period = 'PERIOD',
    /** ' */
    quote = 'QUOTE',
    semi = 'SEMICOLON',
    colon = "COLON",
    /** / */
    slash = 'SLASH',
    backspace = 'BACKSPACE',
    caps = 'CAPSLOCK',
    entr = 'ENTER',
    space = 'SPACE',
    tab = 'TAB',
    delete = 'DELETE',
    end = 'END',
    home = 'HOME',
    insert = 'INSERT',
    pageDown = 'PAGEDOWN',
    pageUp = 'PAGEUP',
    print = 'PRINTSCREEN',
    scrollLock = 'SCROLLLOCK',
    arrowDown = 'ARROWDOWN',
    arrowLeft = 'ARROWLEFT',
    arrowRight = 'ARROWRIGHT',
    arrowUp = 'ARROWUP',
    numLock = 'NUMLOCK',
    numpad0 = 'NUMPAD0',
    numpad1 = 'NUMPAD1',
    numpad2 = 'NUMPAD2',
    numpad3 = 'NUMPAD3',
    numpad4 = 'NUMPAD4',
    numpad5 = 'NUMPAD5',
    numpad6 = 'NUMPAD6',
    numpad7 = 'NUMPAD7',
    numpad8 = 'NUMPAD8',
    numpad9 = 'NUMPAD9',
    numpadAdd = 'NUMPADADD',
    numpadDecimal = 'NUMPADDECIMAL',
    numpadDivide = 'NUMPADDIVIDE',
    numpadEnter = 'NUMPADENTER',
    numpadEqual = 'NUMPADEQUAL',
    numpadMultiply = 'NUMPADMULTIPLY',
    numpadSubtract = 'NUMPADSUBTRACT',
    esc = 'ESCAPE',
    f1 = 'F1',
    f2 = 'F2',
    f3 = 'F3',
    f4 = 'F4',
    f5 = 'F5',
    f6 = 'F6',
    f7 = 'F7',
    f8 = 'F8',
    f9 = 'F9',
    f10 = 'F10',
    f11 = 'F11',
    f12 = 'F12',
    audioVolumeDown = 'AUDIOVOLUMEDOWN',
    audioVolumeUp = 'AUDIOVOLUMEUP',
    audioVolumeMute = 'AUDIOVOLUMEMUTE',
    mediaPlay = 'MEDIAPLAY',
    mediaPause = 'MEDIAPAUSE',
    mediaPlayPause = 'MEDIAPLAYPAUSE',
    mediaStop = 'MEDIASTOP',
    mediaTrackNext = 'MEDIATRACKNEXT',
    mediaTrackPrevious = 'MEDIATRACKPREV',
    f13 = 'F13',
    f14 = 'F14',
    f15 = 'F15',
    f16 = 'F16',
    f17 = 'F17',
    f18 = 'F18',
    f19 = 'F19',
    f20 = 'F20',
    f21 = 'F21',
    f22 = 'F22',
    f23 = 'F23',
    f24 = 'F24'
};

export function isMeta(key: Key): boolean {
    switch (key) {
        case Key.ctrl:
        case Key.shift:
        case Key.alt:
        case Key.super:
            return true
        default: return false
    }
}

export function jsToKey(jsKey: string): Key {
    switch (jsKey) {
        case 'ControlLeft': return Key.ctrl
        case 'ControlRight': return Key.ctrl
        case 'ShiftLeft': return Key.shift
        case 'ShiftRight': return Key.shift
        case 'AltLeft': return Key.alt
        case 'AltRight': return Key.alt
        case 'MetaLeft': return Key.super
        case 'MetaRight': return Key.super
        case 'Backquote': return Key.backquote
        case 'Backslash': return Key.backslash
        case 'BracketLeft': return Key.bracketLeft
        case 'BracketRight': return Key.bracketRight
        case 'Comma': return Key.comma
        case 'Digit0': return Key.n0
        case 'Digit1': return Key.n1
        case 'Digit2': return Key.n2
        case 'Digit3': return Key.n3
        case 'Digit4': return Key.n4
        case 'Digit5': return Key.n5
        case 'Digit6': return Key.n6
        case 'Digit7': return Key.n7
        case 'Digit8': return Key.n8
        case 'Digit9': return Key.n9
        case 'Equal': return Key.eq
        case 'Minus': return Key.minus
        case 'Period': return Key.period
        case "Quote": return Key.quote
        case "Semicolon": return Key.semi
        // case ":": return Key.colon
        case "Slash": return Key.slash
        case "Backspace": return Key.backspace
        case "CapsLock": return Key.caps
        case "Enter": return Key.entr
        case "Space": return Key.space
        case "Tab": return Key.tab
        case "Delete": return Key.delete
        case "End": return Key.end
        case "Home": return Key.home
        case "Insert": return Key.insert
        case "PageDown": return Key.pageDown
        case "PageUp": return Key.pageUp
        case "Print": return Key.print
        case "ScrollLock": return Key.scrollLock
        case "ArrowDown": return Key.arrowDown
        case "ArrowLeft": return Key.arrowLeft
        case "ArrowRight": return Key.arrowRight
        case "ArrowUp": return Key.arrowUp
        case "NumLock": return Key.numLock
        case "Numpad0": return Key.numpad0
        case "Numpad1": return Key.numpad1
        case "Numpad2": return Key.numpad2
        case "Numpad3": return Key.numpad3
        case "Numpad4": return Key.numpad4
        case "Numpad5": return Key.numpad5
        case "Numpad6": return Key.numpad6
        case "Numpad7": return Key.numpad7
        case "Numpad8": return Key.numpad8
        case "Numpad9": return Key.numpad9
        case 'NumpadAdd': return Key.numpadAdd
        case 'NumpadDecimal': return Key.numpadDecimal
        case 'NumpadDivide': return Key.numpadDivide
        case 'NumpadEnter': return Key.numpadEnter
        case 'NumpadEqual': return Key.numpadEqual
        case 'NumpadMultiply': return Key.numpadMultiply
        case 'NumpadSubtract': return Key.numpadSubtract
        case "Escape": return Key.esc
        case "F1": return Key.f1
        case "F2": return Key.f2
        case "F3": return Key.f3
        case "F4": return Key.f4
        case "F5": return Key.f5
        case "F6": return Key.f6
        case "F7": return Key.f7
        case "F8": return Key.f8
        case "F9": return Key.f9
        case "F10": return Key.f10
        case "F11": return Key.f11
        case "F12": return Key.f12
        case "AudioVolumeDown": return Key.audioVolumeDown
        case "AudioVolumeUp": return Key.audioVolumeUp
        case "AudioVolumeMute": return Key.audioVolumeMute
        case "MediaPlay": return Key.mediaPlay
        case "MediaPause": return Key.mediaPause
        case "MediaPlayPause": return Key.mediaPlayPause
        case "MediaStop": return Key.mediaStop
        case "mediaTrackNext": return Key.mediaTrackNext
        case "mediaTrackPrev": return Key.mediaTrackPrevious
        case "F13": return Key.f13
        case "F14": return Key.f14
        case "F15": return Key.f15
        case "F16": return Key.f16
        case "F17": return Key.f17
        case "F18": return Key.f18
        case "F19": return Key.f19
        case "F20": return Key.f20
        case "F21": return Key.f21
        case "F22": return Key.f22
        case "F23": return Key.f23
        case "F24": return Key.f24
        case 'KeyA': return Key.a
        case 'KeyB': return Key.b
        case 'KeyC': return Key.c
        case 'KeyD': return Key.d
        case 'KeyE': return Key.e
        case 'KeyF': return Key.f
        case 'KeyG': return Key.g
        case 'KeyH': return Key.h
        case 'KeyI': return Key.i
        case 'KeyJ': return Key.j
        case 'KeyK': return Key.k
        case 'KeyL': return Key.l
        case 'KeyM': return Key.m
        case 'KeyN': return Key.n
        case 'KeyO': return Key.o
        case 'KeyP': return Key.p
        case 'KeyQ': return Key.q
        case 'KeyR': return Key.r
        case 'KeyS': return Key.s
        case 'KeyT': return Key.t
        case 'KeyU': return Key.u
        case 'KeyV': return Key.v
        case 'KeyW': return Key.w
        case 'KeyX': return Key.x
        case 'KeyY': return Key.y
        case 'KeyZ': return Key.z
        default: return Key.caps
    }
}