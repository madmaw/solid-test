import { AnimationManager } from "ui/animation/animation_manager";
import { Animations, RigidEntityController, rigidEntityUI } from "./rigid_entity_controller";
import { CardFace } from "model/domain";
import { RigidEntityComponent } from "./rigid_entity";
import { Component } from "solid-js";
import { EntityController } from "../entity_controller";

export function createRigidEntity(
  actions: Map<CardFace, Animations>,
  EntityComponent: Component,
  entityController: EntityController | undefined,
  flipX: boolean,
) {
  const ui = rigidEntityUI.create({
    activeAnimation: undefined,
    hidden: true,
  });
  const animations = new AnimationManager<Animations>();
  const controller = new RigidEntityController(
    animations,
    actions,
    Animations.Special, 
    ui,
    entityController,
  );
  function Component() {
    return (
      <RigidEntityComponent
          animations={animations}
          hidden={ui.hidden}
          activeAnimation={ui.activeAnimation}
          flipX={flipX}>
        <EntityComponent/>
      </RigidEntityComponent>
    );
  }
  return {
    controller,
    Component,
  }
}