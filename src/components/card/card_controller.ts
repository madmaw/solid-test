import { AnimationManager } from "base/animation_manager";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Card, cardDescriptor, cardFaceDescriptor } from "model/domain";
import { batch } from "solid-js";

export const enum FlipState {
  Flat = 1,
  FlippingUpToVertical,
  FlippingDownFromVertical,
}

export type Animations = FlipState;

export const cardUIDescriptor = activeRecordDescriptor({
  flipState: new LiteralTypeDescriptor<FlipState>(),
});

export type CardUI = typeof cardUIDescriptor.aMutable;
export type CardUIState = typeof cardUIDescriptor.aState;

export class CardController {
  constructor(
    private readonly card: Card,
    private readonly cardUI: CardUI,
    private readonly animations: AnimationManager<Animations>,
  ) {}

  async flip(): Promise<void> {
    this.cardUI.flipState = FlipState.FlippingUpToVertical;
    await this.animations.startAndWaitForAnimation(FlipState.FlippingUpToVertical);
    batch(() => {
      this.card.visibleFaceIndex = (this.card.visibleFaceIndex + 1)
          % this.card.type.faces.length;
      this.cardUI.flipState = FlipState.FlippingDownFromVertical;
    });
    await this.animations.startAndWaitForAnimation(FlipState.FlippingDownFromVertical);
    this.cardUI.flipState = FlipState.Flat;
  }
}
