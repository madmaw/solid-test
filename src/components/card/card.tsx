import { Animations, FlipState } from "./card_controller";
import styles from './card.module.scss';
import { ParentProps, createSignal } from "solid-js";
import { AnimationManager } from "ui/animation/animation_manager";

export type CardProps = ParentProps<{
  flipState: FlipState,
  elevated: boolean,
  animations: AnimationManager<Animations>,
}>;

export function CardComponent(props: CardProps) {
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
  return (
    <div
        classList={{
          [styles.card]: true,
          [styles.elevated]: props.elevated,
        }}>
      <div
          classList={{
              [styles.rotate]: true,
              [styles.flat]: props.flipState === FlipState.Flat,
              [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
              [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
          }}
          onTransitionEnd={props.animations.createTransitionEndEventListener(
            cardRef, () => props.flipState,
          )}
          ref={setCardRef}
      >
        <div classList={{
            [styles.scale]: true,
            [styles.flat]: props.flipState === FlipState.Flat,
            [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
            [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
        }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
