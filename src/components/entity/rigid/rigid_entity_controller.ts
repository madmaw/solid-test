import { AnimationManager } from "ui/animation/animation_manager";
import { EntityController } from "../entity_controller";
import { CardFace } from "model/domain";
import { activeRecordDescriptor } from "model/descriptor/record";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { batch } from "solid-js";

export const enum Animations {
  Appear = 1,
  Disappear,
  Attack,
  Special,
  TakeDamage,
  Die,
};

export const rigidEntityUI = activeRecordDescriptor({
  activeAnimation: optionalDescriptor(new LiteralTypeDescriptor<Animations>()),
  hidden: booleanDescriptor,
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
    await this.performAnimation(
      animation,
      () => this.dynamicEntityController?.perform(face),
    );
    this.rigidEntityUI.activeAnimation = undefined;
  }

  async appear() {
    await batch(() => {
      this.rigidEntityUI.hidden = false;
      return this.performAnimation(
        Animations.Appear,
        () => this.dynamicEntityController?.appear(),
      );  
    });
    this.rigidEntityUI.activeAnimation = undefined;
  }

  async disappear() {
    await this.performAnimation(
      Animations.Disappear,
      () => this.dynamicEntityController?.disappear(),
    );
    batch(() =>{
      this.rigidEntityUI.hidden = true;
      this.rigidEntityUI.activeAnimation = undefined;  
    });

  }

  async die() {
    await this.performAnimation(
      Animations.Die,
      () => this.dynamicEntityController?.die(),
    );
    batch(() =>{
      this.rigidEntityUI.hidden = true;
      this.rigidEntityUI.activeAnimation = undefined;  
    });
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
