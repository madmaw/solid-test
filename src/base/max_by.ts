export function maxBy<T>(a: readonly T[], f: (t: T) => number) {
  const v = a.reduce<[T, number] | undefined>((acc, t) => {
    const v = f(t);
    if (acc == null || v > acc[1]) {
      return [t, v];
    }
    return acc;
  }, undefined);

  return v?.[1];
}

export function minBy<T>(a: readonly T[], f: (t: T) => number) {
  const v = a.reduce<[T, number] | undefined>((acc, t) => {
    const v = f(t);
    if (acc == null || v < acc[1]) {
      return [t, v];
    }
    return acc;
  }, undefined);

  return v?.[1];
}