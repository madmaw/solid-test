import { booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import { AnimationManager } from "ui/animation/animation_manager";

export const enum PageSide {
  Left = 1,
  Right,
}

export type Animations = 'pop-up' | 'pop-down';

export const pageUIDescriptor = activeRecordDescriptor({
  popped: booleanDescriptor,
});

export type PageUI = typeof pageUIDescriptor.aMutable;
export type PageUIState = typeof pageUIDescriptor.aState;

export class PageController {

  constructor(
    private readonly pageUI: PageUI,
    private readonly animations: AnimationManager<Animations>,
  ) {
  }

  async popUp() {
    this.pageUI.popped = true;
    return this.animations.waitForAnimation('pop-up');
  }

  async popDown() {
    this.pageUI.popped = false;
    return this.animations.waitForAnimation('pop-down');
  }
}
