import { SceneryController } from "../scenery_controller";

export class UnicodeSceneryController implements SceneryController {
  constructor(readonly dimensions: readonly [number, number]) {}

  async popup(): Promise<void> {
    
  }

  async popdown(): Promise<void> {
    
  }
}
