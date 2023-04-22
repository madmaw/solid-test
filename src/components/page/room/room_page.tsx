import styles from './room_page.module.scss';
import { For } from "solid-js";
import { PageSide } from "../page_controller";
import { Scenery } from "./room_page_controller";
import constants from '../../constants.module.scss';

const pageWidth = parseInt(constants.pageWidth);

export function RoomPageComponent(props: {
  scenery: readonly Scenery[],
  side: PageSide,
}) {
  return (
    <div classList={{
      [styles.room]: true,
    }}>
      <For each={props.scenery}>
        {scenery => (
          <div
              class={styles.scenery}
              style={{
                top: `${scenery.y}vmin`,
                transform: `translateZ(${scenery.y/1000}vmin)`,
              }}>
            <scenery.Component
                x={`${scenery.x - (props.side === PageSide.Left ? 0 : pageWidth)}vmin`}
            />
          </div>
        )}
      </For>
    </div>
  );
}
