import { clamp } from "./number.js";

export function randomElementIn<T>(array: T[]) {
  return array[Math.min(randomInt(array.length), array.length - 1)];
}

export function randomIntIn(min = 0, max = 100) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  let randomNumber = randomBuffer[0] / (0xffffffff + 1);
  return clamp(Math.round(randomNumber * (max - min + 1)) + min, min, max);
}

export function randomInt(max = 100) {
  return randomIntIn(0, max);
}

export function generatePassword(
  length = 20,
  characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
) {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
}
