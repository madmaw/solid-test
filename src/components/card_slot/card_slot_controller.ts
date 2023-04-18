import { booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";

export const cardSlotUIDescriptor = activeRecordDescriptor({
  targetCardHidden: booleanDescriptor,
});

export type CardSlotUI = typeof cardSlotUIDescriptor.aMutable;
export type CardSlotUIState = typeof cardSlotUIDescriptor.aState;

export class CardSlotController {
  constructor(private readonly cardSlotUI: CardSlotUI) {
  }

  setTargetCardHidden(hidden: boolean) {
    this.cardSlotUI.targetCardHidden = hidden;
  }
}