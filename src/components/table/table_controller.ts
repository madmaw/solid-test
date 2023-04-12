import { AnimatedSignal, createAnimationDeferred } from "base/animated_signal";
import { AnimationHandler } from "base/animation_handler";
import { LiteralTypeDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "model/descriptor/record";
import { signalDescriptor } from "model/descriptor/signal";

export const enum View {
  TopDown = 0,
  TopDownBookCentered = 1,
  Tilted = 2,
};

const viewDescriptor = new LiteralTypeDescriptor<View>();

export const tableDescriptor = valueRecordDescriptor({
  view: signalDescriptor(viewDescriptor),
});

export type Table = typeof tableDescriptor.aMutable;
export type TableState = typeof tableDescriptor.aState;

export class TableController {
  readonly viewAnimationHandler = new AnimationHandler<View, HTMLDivElement>(
      ...this.table.view,
  );
  constructor(
    private readonly table: Table,
  ) {
  }
}
