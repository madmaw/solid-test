import { AnimationManager } from "ui/animation/animation_manager";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Card} from "model/domain";
import { batch } from "solid-js";
import { optionalDescriptor } from "model/descriptor/option";

export const enum FlipState {
  Flat = 1,
  FlippingUpToVertical,
  FlippingDownFromVertical,
}

export const Offset = -1;

export type Animations = FlipState | typeof Offset;

export const cardUIDescriptor = activeRecordDescriptor({
  flipState: new LiteralTypeDescriptor<FlipState>(),
  peeking: booleanDescriptor,
  offset: optionalDescriptor(
      new LiteralTypeDescriptor<{ dx: string, dy: string, dz: string }>(),
  ),
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
    await this.internalFlip(() => {
      this.card.visibleFaceIndex = (this.card.visibleFaceIndex + 1) % this.card.definition.faces.length;
    })
  }

  async flipTemporarily(peeking: boolean): Promise<void> {
    await this.internalFlip(() => {
      this.cardUI.peeking = peeking;
    });
  }
  
  async flipUpToVertical(): Promise<void> {
    this.cardUI.flipState = FlipState.FlippingUpToVertical;
    await this.animations.waitForAnimation(FlipState.FlippingUpToVertical);
  }

  async flipDownFromVertical(): Promise<void> {
    this.cardUI.flipState = FlipState.FlippingDownFromVertical;
    await this.animations.waitForAnimation(FlipState.FlippingDownFromVertical);
    this.cardUI.flipState = FlipState.Flat;
  }

  async moveTo(dx: string, dy: string, dz: string) {
    this.cardUI.offset = {
      dx, dy, dz,
    }
    await this.animations.waitForAnimation(Offset);
    this.cardUI.offset = undefined;
  }

  isPeeking() {
    return this.cardUI.peeking;
  }

  private async internalFlip(doFlip: () => void) {
    await this.flipUpToVertical();
    doFlip();
    await this.flipDownFromVertical();
  }
}
