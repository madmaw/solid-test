import { AnimationManager } from "ui/animation/animation_manager";
import { LiteralTypeDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";

export const enum View {
  TopDown = 0,
  TopDownBookCentered = 1,
  Tilted = 2,
};

export type Animations = View;

const viewDescriptor = new LiteralTypeDescriptor<View>();

export const tableUIDescriptor = activeRecordDescriptor({
  view: viewDescriptor,
});

export type TableUI = typeof tableUIDescriptor.aMutable;
export type TableUIState = typeof tableUIDescriptor.aState;

export class TableController {

  constructor(
    private readonly tableUI: TableUI,
    private readonly animations: AnimationManager<Animations>,
  ) {
  }

  async setView(view: View) {
    if (this.tableUI.view !== view) {
      this.tableUI.view = view;
      return this.animations.waitForAnimation(view);
    }
  }
}
