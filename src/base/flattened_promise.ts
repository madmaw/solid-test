export type FlattenedPromise<T> = {
  promise: Promise<T>;
  reject: (e: unknown) => void;
  resolve: (t: T) => void;
}

export function createFlattenedPromise<T>(): FlattenedPromise<T> {
  let _resolve: (t: T) => void;
  let _reject: (e: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  return {
    promise,
    resolve: (t: T) => _resolve(t),
    reject: (e: unknown) => _reject(e), 
  };
}