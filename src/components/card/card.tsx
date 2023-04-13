import { FlipState } from "./card_controller";
import styles from './card.module.scss';
import { ParentProps } from "solid-js";

export type CardProps = ParentProps<{
  flipState: FlipState,
}>;

export function CardComponent(props: CardProps) {
  return (
    <div classList={{
      [styles.card]: true,
      [styles.flat]: props.flipState === FlipState.Flat,
      [styles.flippingUpToVertical]: props.flipState === FlipState.FlippingUpToVertical,
      [styles.flippingDownFromVertical]: props.flipState === FlipState.FlippingDownFromVertical,
    }}>
      {props.children}
    </div>
  );
}
