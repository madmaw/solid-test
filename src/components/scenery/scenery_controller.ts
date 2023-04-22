export interface SceneryController {
  popup(): Promise<void>;

  popdown(): Promise<void>;

  readonly dimensions: readonly [number, number];
}