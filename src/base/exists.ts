export function exists<T>(t: T | undefined): t is T {
  return t != null;
}