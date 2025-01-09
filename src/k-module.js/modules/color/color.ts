import { lerp } from "../math";

export const KModColor = 'white'
export function kModColor() {
    return KModColor
}

export function makeColorNoizes(size = 1): string[] {
    var now = Date.now() * 1e-4;
    var colors: string[] = [];
    for (var i = 0; i < size; i++) {
        colors.push(`#${Math.floor(
            0xffffff * (Math.sin(now * 1e-4 + i) + 1) * 0.5
        )
            .toString(16)
            .padStart(6, "0")}`)
    }
    return colors
}

export function highlightColor(from: string, to: string, speed = 1e-4): string {
    var now = Date.now() * speed;
    var t = (Math.sin(now * speed) + 1) * 0.5
    return lerpColorHex(from, to, t)

}
export function lerpColorHex(from: string, to: string, t: number): string {
    var [r0, g0, b0] = hextToRGB(from)
    var [r1, g1, b1] = hextToRGB(to)
    var [r, g, b] = [[r0, r1], [g0, g1], [b0, b1]].map(c => Math.floor(lerp(t, c[0], c[1])))
    return rgbToHexString(r, g, b)
}
export function animateColor(from: string, to: string, durationMs: number, callback: (color: string) => void) {
    var t0 = Date.now()
    var interval = setInterval(() => {
        var t = (Date.now() - t0) / durationMs
        if (t >= 1) {
            callback(lerpColorHex(from, to, 1))
            clearInterval(interval)
        } else {
            callback(lerpColorHex(from, to, t))
        }
    }, 33)
}
export function rgbToHex(r: number, g: number, b: number): number {
    var sq = 16 * 16
    return r * sq * sq + g * sq + b
}
export function rgbToHexString(r: number, g: number, b: number): string {
    return `#${rgbToHex(r, g, b).toString(16).padStart(6, "0")}`
}
export function hextToRGB(hex: string): [number, number, number] {
    return [1, 3, 5].map(i => Number("0x" + hex.substring(i, i + 2))) as [number, number, number]
}