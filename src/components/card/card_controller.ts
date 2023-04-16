import { AnimationManager } from "ui/animation/animation_manager";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Card} from "model/domain";
import { batch } from "solid-js";

export const enum FlipState {
  Flat = 1,
  FlippingUpToVertical,
  FlippingDownFromVertical,
}

export type Animations = FlipState;

export const cardUIDescriptor = activeRecordDescriptor({
  flipState: new LiteralTypeDescriptor<FlipState>(),
  peeking: booleanDescriptor,  
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
    this.internalFlip(() => {
      this.card.visibleFaceIndex = this.card.visibleFaceIndex + 1;
    })
  }

  async flipTemporarily(): Promise<void> {
    this.internalFlip(() => {
      this.cardUI.peeking = !this.cardUI.peeking;
    });
  }

  private async internalFlip(doFlip: () => void) {
    this.cardUI.flipState = FlipState.FlippingUpToVertical;
    await this.animations.waitForAnimation(FlipState.FlippingUpToVertical);
    batch(() => {
      doFlip();
      this.cardUI.flipState = FlipState.FlippingDownFromVertical;
    });
    await this.animations.waitForAnimation(FlipState.FlippingDownFromVertical);
    this.cardUI.flipState = FlipState.Flat;

  }
}
