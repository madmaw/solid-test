export interface SceneryController {
  popup(): Promise<void>;

  popdown(): Promise<void>;
}