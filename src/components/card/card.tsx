import { Animations, FlipState } from "./card_controller";
import styles from './card.module.scss';
import { ParentProps } from "solid-js";
import { AnimationManager } from "base/animation_manager";

export type CardProps = ParentProps<{
  flipState: FlipState,
  animations: AnimationManager<Animations>,
}>;

export function CardComponent(props: CardProps) {
  let cardRef: HTMLDivElement | undefined;
  return (
    <div
        classList={{
          [styles.card]: true,
          [styles.flat]: props.flipState === FlipState.Flat,
          [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
          [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
        }}
        ref={cardRef}
        onTransitionEnd={props.animations.createTransitionEndCallback(
          props.flipState, cardRef
        )}>
      <div classList={{
          [styles.internal]: true,
          [styles.flat]: props.flipState === FlipState.Flat,
          [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
          [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
      }}>
        {props.children}
      </div>
    </div>
  );
}
