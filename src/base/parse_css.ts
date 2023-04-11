export function parsePx(px: string): number | undefined;
export function parsePx<T>(px: string, fallback: T): number | T;
export function parsePx<T>(px: string, fallback?: T): number | T | undefined {
    const value = /^(\d+)px$/.exec(px)?.[0];
    return value != null
        ? parseInt(value)
        : fallback;
}