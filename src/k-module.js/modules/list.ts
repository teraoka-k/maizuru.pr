import { randomInt } from "./math/random";

export function removeAt<T>(array: T[], index: number) {
  var element = array[index];
  array.splice(index, 1);
  return element;
}

export function removeRandom<T>(array: T[]) {
  return removeAt(array, randomInt(array.length - 1));
}
