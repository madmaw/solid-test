import { AnimatedSignal, createAnimationDeferred } from "base/animated_signal";
import { AnimationHandler } from "base/animation_handler";
import { AnimationManager } from "base/animation_manager";
import { LiteralTypeDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "model/descriptor/record";
import { signalDescriptor } from "model/descriptor/signal";

export const enum View {
  TopDown = 0,
  TopDownBookCentered = 1,
  Tilted = 2,
};

export type Animations = 'view';

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
      return this.animations.startAndWaitForAnimation('view');
    }
  }
}
