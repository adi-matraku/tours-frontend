export function intersect(a: string[] | undefined, b: string[] | undefined) {
  const setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}
