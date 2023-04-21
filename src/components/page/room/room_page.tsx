import styles from './room_page.module.scss';
import { For } from "solid-js";
import { PageSide } from "../page_controller";
import { Scenery } from "./room_page_controller";

export function RoomPageComponent(props: {
  scenery: readonly Scenery[],
  side: PageSide,
}) {
  return (
    <div classList={{
      [styles.room]: true,
      [styles.right]: props.side === PageSide.Right,
    }}>
      <For each={props.scenery}>
        {scenery => (
          <scenery.Component/>
        )}
      </For>
    </div>
  );
}
