import { BookSpreadRoom } from "model/domain";
import { SpreadProps } from "../spread";
import styles from './spread_room.module.scss';

export function SpreadRoomComponent(props: SpreadProps<BookSpreadRoom>) {
  return (
    <div class={styles.container}>
      <props.CardSlotsComponent model={props.spread.cardSlots}/>
    </div>
  );
}