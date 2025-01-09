import { expect, it } from 'bun:test'
import { enumValues } from '../util'

enum Foo {
    A = 'a',
    B = 'b',
}

it('utill', () => {
    var a = ['k', 'c', 'a', 'b', 'd'].sort((s1, s2) => s1.localeCompare(s2))
    expect(1).toBe(1)
})
