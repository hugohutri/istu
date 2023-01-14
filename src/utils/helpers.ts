// range iterator function for loops
export function* range(start: number, end: number, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
