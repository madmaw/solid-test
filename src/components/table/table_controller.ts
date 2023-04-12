import { LiteralTypeDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";

export const enum View {
  TopDown = 0,
  TopDownBookCentered = 1,
  Tilted = 2,
};

export const tableDescriptor = activeRecordDescriptor({
  view: new LiteralTypeDescriptor<View>(),
});

export type Table = typeof tableDescriptor.aMutable;
export type TableState = typeof tableDescriptor.aState;

export class TableController {

  constructor(private readonly table: Table) {

  }

  setView(view: View) {
    this.table.view = view;
  }
}
