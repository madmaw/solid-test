import { AnimationManager } from "base/animation_manager";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import { cardDescriptor } from "model/domain";
import { batch } from "solid-js";

export const enum Animations {
  FlippingUpToVertical = 1,
  FlippingDownFromVertical,
};

export const enum FlipState {
  Flat = 1,
  FlippingUpToVertical,
  FlippingDownFromVertical,
}

export const cardUIDescriptor = activeRecordDescriptor({
  card: cardDescriptor,
  flipState: new LiteralTypeDescriptor<FlipState>(),
});

export type CardUI = typeof cardUIDescriptor.aMutable;
export type CardUIState = typeof cardUIDescriptor.aState;

export class CardController {
  constructor(
    private readonly cardUI: CardUI,
    private readonly animations: AnimationManager<Animations>,
  ) {}

  async flip(): Promise<void> {
    this.cardUI.flipState = FlipState.FlippingUpToVertical;
    await this.animations.startAndWaitForAnimation(Animations.FlippingUpToVertical);
    batch(() => {
      this.cardUI.card.visibleFaceIndex = (this.cardUI.card.visibleFaceIndex + 1)
          % this.cardUI.card.type.faces.length;
      this.cardUI.flipState = FlipState.FlippingDownFromVertical;
    });
    await this.animations.startAndWaitForAnimation(Animations.FlippingDownFromVertical);
    this.cardUI.flipState = FlipState.Flat;
  }
}
