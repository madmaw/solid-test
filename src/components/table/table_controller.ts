import { AnimationManager } from "ui/animation/animation_manager";
import { LiteralTypeDescriptor, numberDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import styles from './table.module.scss';
import { batch } from "solid-js";

const bookTop = parseInt(styles.bookTop);
const bookHeight = parseInt(styles.bookHeight);
const tableWidth = parseInt(styles.tableWidth);
const handSlotTop = parseInt(styles.handSlotTop);
const handSlotWidth = parseInt(styles.handSlotWidth);
const cardWidth = parseInt(styles.cardWidth);

export const enum View {
  TopDown = 0,
  TopDownBookCentered = 1,
  Tilted = 2,
};

export type Animations = View;

const viewDescriptor = new LiteralTypeDescriptor<View>();

export const tableUIDescriptor = activeRecordDescriptor({
  view: viewDescriptor,
  lookDx: numberDescriptor,
  lookDy: numberDescriptor,
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

  async look(dx: number, dy: number) {
    batch(() => {
      this.tableUI.lookDx = dx;
      this.tableUI.lookDy = dy;
    });
  }

  getCardSlotTablePosition(slotIndex: number): [number, number, number] {
    // TODO make number of slots based on game instead of hard coded
    const x = (tableWidth - handSlotWidth)/2
        + slotIndex * (handSlotWidth - cardWidth)/5;
    const y = bookTop + bookHeight + handSlotTop;
    return [x, y, 0];
  }

  getPlayerDeckTablePosition(): [number, number, number] {
    const x = (tableWidth - handSlotWidth)/2 - cardWidth;
    const y = bookTop + bookHeight + handSlotTop;

    return [x, y, 0];
  }
}
