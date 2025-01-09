import { describe, expect, it } from 'bun:test'
import { kModColor, KModColor as KModColor, rgbToHex } from './color'

it('color', () => {
    //assert
    expect(0x0000ff).toBe(rgbToHex(0, 0, 255))
    expect(0x00ff00).toBe(rgbToHex(0, 255, 0))
    expect(0xff0000).toBe(rgbToHex(255, 0, 0))
    expect(0xffffff).toBe(rgbToHex(255, 255, 255))
    expect(0x000000).toBe(rgbToHex(0, 0, 0))
    expect(0xffff00).toBe(rgbToHex(255, 255, 0))
    expect(0x00ffff).toBe(rgbToHex(0, 255, 255))
})
