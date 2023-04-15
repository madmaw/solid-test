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

export const tableDescriptor = activeRecordDescriptor({
  view: viewDescriptor,
});

export type Table = typeof tableDescriptor.aMutable;
export type TableState = typeof tableDescriptor.aState;

export class TableController {

  constructor(
    private readonly table: Table,
    private readonly animations: AnimationManager<Animations>,
  ) {
  }

  async setView(view: View) {
    if (this.table.view !== view) {
      this.table.view = view;
      return this.animations.waitForAnimation(view);
    }
  }
}
