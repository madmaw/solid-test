export function arrayRandomize<T>(a: readonly T[]): readonly T[] {
  const mutable = [...a];
  for (let i=0; i<mutable.length; i++) {
    const [v] = mutable.splice(Math.floor(Math.random() * mutable.length), 1);
    mutable.push(v);
  }
  return mutable;
}