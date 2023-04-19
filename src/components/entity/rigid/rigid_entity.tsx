import { AnimationManager } from 'ui/animation/animation_manager';
import styles from './rigid_entity.module.scss';
import { Animations, RigidEntityUI } from './rigid_entity_controller';
import { ParentProps } from 'solid-js';

export function RigidEntityComponent(props: ParentProps<{
  animations: AnimationManager<Animations>,
  rigidEntityUI: RigidEntityUI,
}>) {
  return (
    <div classList={{
      [styles.entity]: true,
    }}>
      {props.children}
    </div>
  );
}