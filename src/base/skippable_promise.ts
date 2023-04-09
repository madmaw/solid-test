export type SkippablePromise<T> = Promise<T> & {
    skip(): void,
}

class SkippedError extends Error {}

export function newSkippablePromise<T>(
    callback: ConstructorParameters<typeof Promise<T>>[0]
): SkippablePromise<T | void> {
    let skip: (t: T | void) => void;
    const result = new Promise<T | void>((resolve, reject) => {
        callback(resolve, reject);
        skip = resolve;
        (result as any)['skip'] = () => reject(new SkippedError());
    });
    return result.catch(e => {
        if (e instanceof SkippedError) {
            return;
        }
        throw e;
    }) as any;
}
