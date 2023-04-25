export function arrayRandomize<T>(a: readonly T[]): readonly T[] {
  const mutable = [...a];
  for (let i=0; i<mutable.length; i++) {
    const [v] = mutable.splice(i, 1);
    mutable.splice(Math.floor(Math.random() * mutable.length), 0, v);
  }
  return mutable;
}