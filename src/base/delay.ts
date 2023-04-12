import { createFlattenedPromise } from "./flattened_promise";

export function delay(milliseconds: number): Promise<void> {
  const { promise, resolve } = createFlattenedPromise<void>();
  setTimeout(resolve, milliseconds);
  return promise;
}