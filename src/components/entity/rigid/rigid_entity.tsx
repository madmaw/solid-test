import { AnimationManager } from 'ui/animation/animation_manager';
import styles from './rigid_entity.module.scss';
import { Animations } from './rigid_entity_controller';
import { ParentProps, createSignal } from 'solid-js';
import { UnreachableError } from 'base/unreachable_error';

export function RigidEntityComponent(props: ParentProps<{
  animations: AnimationManager<Animations>,
  activeAnimation: Animations | undefined,
  hidden: boolean,
  flipX: boolean,
}>) {
  const [ref, setRef] = createSignal<HTMLDivElement>();
  const animationName = () => {
    switch (props.activeAnimation) {
      case Animations.Appear:
        return styles.appearAnimation;
      case Animations.Attack:
        return styles.attackAnimation;
      case Animations.Die:
      case Animations.Special:
      case Animations.TakeDamage:
      case undefined:
        return '';
      default:
        throw new UnreachableError(props.activeAnimation)
    }
  };
  // TODO this sucks
  const onAnimationEnd = props.animations.createAnimationEndEventListener(ref, () => [props.activeAnimation!, animationName()]);
  return (
    <div
        classList={{
          [styles.entity]: true,
          [styles.hidden]: props.hidden,
          [styles.idle]: props.activeAnimation == null,
          [styles.appear]: props.activeAnimation === Animations.Appear,
          [styles.attack]: props.activeAnimation === Animations.Attack,
        }}
        onAnimationEnd={onAnimationEnd}
        ref={setRef}>
      <div
          classList={{
            [styles.inner]: true,
            [styles.flipX]: props.flipX,
          }}>
        {props.children}
      </div>
    </div>
  );
}