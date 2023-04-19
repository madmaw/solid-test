import { AnimationManager } from "ui/animation/animation_manager";
import { EntityController } from "../entity_controller";
import { CardFace } from "model/domain";
import { activeRecordDescriptor } from "model/descriptor/record";
import { LiteralTypeDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";

export const enum Animations {
  Appear = 1,
  Attack,
  Special,
  TakeDamage,
  Die,
};

export const rigidEntityUI = activeRecordDescriptor({
  activeAnimation: optionalDescriptor(new LiteralTypeDescriptor<Animations>()),
});

export type RigidEntityUI = typeof rigidEntityUI.aMutable;
export type RigidiEntityUIState = typeof rigidEntityUI.aState;

export class RigidEntityController implements EntityController {
  constructor(
    private readonly animations: AnimationManager<Animations>,
    private readonly actions: Map<CardFace, Animations>,
    private readonly fallbackAnimation: Animations | undefined,
    private readonly rigidEntityUI: RigidEntityUI,
    private readonly dynamicEntityController: EntityController | undefined,
  ) {

  }

  async perform(face: CardFace) {
    const animation = this.actions.get(face) || this.fallbackAnimation;
    this.performAnimation(
      animation,
      () => this.dynamicEntityController?.perform(face),
    );
  }

  private async performAnimation(
    animation: Animations | undefined,
    dynamicAnimation: () => Promise<void> | undefined,
  ) {
    this.rigidEntityUI.activeAnimation = animation;
    await Promise.all([
      animation != null && this.animations.waitForAnimation(animation),
      dynamicAnimation(),
    ]);
  }
}
