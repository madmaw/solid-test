import { AnimationManager } from "ui/animation/animation_manager";
import { SceneryController } from "../scenery_controller";
import { activeRecordDescriptor } from "model/descriptor/record";
import { booleanDescriptor } from "model/descriptor/literals";

export const enum Animations {
  Popped = 1,
};

export const rigidSceneryUI = activeRecordDescriptor({
  up: booleanDescriptor,
});

export type RigidSceneryUI = typeof rigidSceneryUI.aMutable;

export class RigidSceneryController implements SceneryController {
  constructor(
    private readonly animations: AnimationManager<Animations>,
    private readonly ui: RigidSceneryUI,
    private readonly controller: SceneryController,
  ) {

  }

  async popup(): Promise<void> {
    if (!this.ui.up) {
      this.ui.up = true;
      await this.animations.waitForAnimation(Animations.Popped);
    }
  }

  async popdown(): Promise<void> {
    if (this.ui.up) {
      this.ui.up = false;
      await this.animations.waitForAnimation(Animations.Popped);  
    }
  }

  get dimensions(): readonly [number, number] {
    return this.controller.dimensions;
  }
}