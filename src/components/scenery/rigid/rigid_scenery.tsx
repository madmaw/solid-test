import { ParentProps, createSignal } from "solid-js";
import styles from './rigid_scenery.module.scss';
import { AnimationManager } from "ui/animation/animation_manager";
import { Animations } from "./rigid_scenery_controller";

export function RigidSceneryComponent(props: ParentProps<{
  up: boolean,
  animations: AnimationManager<Animations>,
  x: string,
}>) {
  const [ref, setRef] = createSignal<HTMLDivElement>();
  return (
    <div
        ref={setRef}
        classList={{
          [styles.scenery]: true,
          [styles.down]: !props.up,
          [styles.up]: props.up,
        }}
        onTransitionEnd={props.animations.createTransitionEndEventListener(ref, () => Animations.Popped)}>
      <div
        style={{
          'margin-left': props.x,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}