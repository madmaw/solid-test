import { BookSpreadRoom } from "model/domain";
import { SpreadOverlayProps } from "../spread_overlay";
import styles from './spread_overlay_room.module.scss';

export function SpreadOverlayRoomComponent(props: SpreadOverlayProps<BookSpreadRoom>) {
  return (
    <div class={styles.container}>
      <props.CardSlotsComponent model={props.spread.cardSlots}/>
    </div>
  );
}