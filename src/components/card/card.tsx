import { Animations, Easing, FlipState, Offset } from "./card_controller";
import styles from './card.module.scss';
import { ParentProps, createSignal } from "solid-js";
import { AnimationManager } from "ui/animation/animation_manager";

export type CardProps = ParentProps<{
  flipState: FlipState,
  elevated: boolean,
  animations: AnimationManager<Animations>,
  offset: { dx: string, dy: string, dz: string, easing: Easing } | undefined,
}>;

export function CardComponent(props: CardProps) {
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
  const [cardRotateRef, setCardRotateRef] = createSignal<HTMLDivElement>();
  return (
    <div
        classList={{
          [styles.card]: true,
          [styles.elevated]: props.elevated,
        }}
    >
      <div 
          classList={{
            [styles.translate]: true,
            [styles.gentle]: props.offset?.easing === Easing.Gentle,
            [styles.violent]: props.offset?.easing === Easing.Violent,
          }}
          style={props.offset && {
            transform: `translate3d(${props.offset.dx}, ${props.offset.dy}, ${props.offset.dz})`
          }}
          onTransitionEnd={props.animations.createTransitionEndEventListener(
            cardRef,
            () => Offset,
          )}
          ref={setCardRef}
      >
        <div
            classList={{
                [styles.rotate]: true,
                [styles.flat]: props.flipState === FlipState.Flat,
                [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
                [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
            }}
            onTransitionEnd={props.animations.createTransitionEndEventListener(
              cardRotateRef,
              () => props.flipState,
            )}
            ref={setCardRotateRef}
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
    </div>
  );
}
