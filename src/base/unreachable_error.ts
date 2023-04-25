export class UnreachableError extends Error {
  constructor(readonly value: never) {
    super();
  }
}
