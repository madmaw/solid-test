import { AnimationManager } from "ui/animation/animation_manager";
import { Animations, RigidSceneryController, rigidSceneryUI } from "./rigid_scenery_controller";
import { RigidSceneryComponent } from "./rigid_scenery";
import { ComponentAndController } from "components/component_manager";
import { SceneryController } from "../scenery_controller";

export function createRigidScenery(
    proxied: ComponentAndController<{}, SceneryController>,
    flipX: boolean,
) {
  const ui = rigidSceneryUI.create({
    up: false,
  });
  const animations = new AnimationManager<Animations>;
  const controller = new RigidSceneryController(animations, ui, proxied.controller);
  function Component(props: { x: string }) {
    return (
        <RigidSceneryComponent
            animations={animations}
            up={ui.up}
            x={props.x}
            flipX={flipX}>
          <proxied.Component/>
        </RigidSceneryComponent>
    );
  }
  return {
    controller,
    Component,
  }
}