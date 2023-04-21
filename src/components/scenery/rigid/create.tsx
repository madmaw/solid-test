import { AnimationManager } from "ui/animation/animation_manager";
import { Animations, RigidSceneryController, rigidSceneryUI } from "./rigid_scenery_controller";
import { RigidSceneryComponent } from "./rigid_scenery";
import { Component } from "solid-js";

export function createRigidScenery(C: Component) {
  const ui = rigidSceneryUI.create({
    up: false,
  });
  const animations = new AnimationManager<Animations>;
  const controller = new RigidSceneryController(animations, ui);
  function Component(props: {
    x: string,
  }) {
    return (
        <RigidSceneryComponent
            animations={animations}
            up={ui.up}
            x={props.x}>
          <C/>
        </RigidSceneryComponent>
    );
  }
  return {
    controller,
    Component,
  }
}