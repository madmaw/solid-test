import { CardFace } from "model/domain";
import { FlipState } from "./card_controller";
import styles from './card.module.scss';

export type CardProps = {
  face: CardFace,
  flipState: FlipState,
};

export function CardComponent(props: CardProps) {
  return (
    <div class={styles.card}>

    </div>
  );
}
