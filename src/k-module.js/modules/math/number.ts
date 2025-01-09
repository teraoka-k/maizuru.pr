export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function zeros(size: number) {
  return [...Array(size)].map(() => 0);
}

export function ones(size: number) {
  return [...Array(size)].map(() => 1);
}

export function range(min: number, max: number) {
  return [...Array(max - min + 1)].map((_, i) => i + min);
}

export function listOf(mapper: (i: number) => number, size: number) {
  return [...Array(size)].map(mapper);
}

export function lerp(t: number, n1: number, n2: number) {
  return n1 * (1 - t) + t * n2;
}
