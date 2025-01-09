import { KeyBinding } from "./keybinding";
import { Key, Modifier, ShortcutKey } from ".";

export async function bindKeys(keys: KeyBinding[]) {
    var keysWithoutMod: KeyBinding[] = [];
    var keysWithMod = new Map<Key, KeyBinding[]>();
    keys.filter(key => key.key.key).forEach(key => {
        var mod = key.key.customModifier;
        if (mod)
            keysWithMod.set(mod, keysWithMod.get(mod)?.concat(key) ?? [key])
        else
            keysWithoutMod.push(key)
    })
    keysWithMod.forEach((keysWithThisMod, mod, _) => registerWithModifier(mod, keysWithThisMod));
    await Promise.all(keysWithoutMod.map(keybinding => keybinding.register()))
}

async function registerWithModifier(modifier: Key, keys: KeyBinding[]) {
    var mod = new ShortcutKey(modifier);
    registerHotkeysWithCustomModifier(mod, keys);
    [
        Modifier.Ctrl,
        Modifier.Shift,
        Modifier.Alt,
        Modifier.Super,
        Modifier.Ctrl | Modifier.Shift,
        Modifier.Ctrl | Modifier.Alt,
        Modifier.Ctrl | Modifier.Super,
        Modifier.Shift | Modifier.Alt,
        Modifier.Shift | Modifier.Super,
        Modifier.Alt | Modifier.Super,
        Modifier.Ctrl | Modifier.Shift | Modifier.Alt,
        Modifier.Ctrl | Modifier.Shift | Modifier.Super,
        Modifier.Ctrl | Modifier.Alt | Modifier.Super,
        Modifier.Shift | Modifier.Alt | Modifier.Super,
        Modifier.Ctrl | Modifier.Shift | Modifier.Alt | Modifier.Super,
    ].forEach((modifier: Modifier) => {
        if (keys.find(key => key.key.modifier & modifier))
            registerHotkeysWithCustomModifier(mod.clone().setModifier(modifier), keys);
    });
}

var isWaiting = false
async function registerHotkeysWithCustomModifier(modifier: ShortcutKey, keybindings: KeyBinding[]) {
    await modifier.register(
        async () => {
            // avoid repeating while holding a key
            if (!isWaiting) {
                await Promise.all(keybindings.map(keybinding => keybinding.register()))
                isWaiting = true
            }
        },
        async () => {
            // avoid duplicate API-call that causes error as all calls but the first one fail because there are no registered keys anymore
            if (isWaiting) {
                isWaiting = false
                await Promise.all(keybindings.map(async keybinding => keybinding.key.unregister()));
            }
        }
    );
}

