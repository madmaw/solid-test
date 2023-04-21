import { BookSpreadRoom } from "model/domain";
import { RoomPageController, RoomPageUI, Scenery } from "./room_page_controller";
import { RoomPageComponent } from "./room_page";
import { PageSide } from "../page_controller";
import { createRigidScenery } from "components/scenery/rigid/create";
import { createUnicodeEntity } from "components/entity/unicode/create";

import styles from '../../constants.module.scss';
import { exists } from "base/exists";

const pageWidth = parseInt(styles.pageWidth);
const pageHeight = parseInt(styles.pageHeight);

function createScenery(spread: BookSpreadRoom) {
  const cx = pageWidth;
  const cy = pageHeight;
  const r = spread.encounter != null ? pageWidth : 0; 

  const trees = Math.floor(Math.random() * 20) + 20;

  return new Array(trees).fill(0).map(() => {
    const height = Math.random() * pageHeight/8 + pageHeight/8;
    const {
      Component: Scenery,
      controller,
    } = createRigidScenery(createUnicodeEntity('🌲', `${height}vmin`));
    const x = Math.random() * (pageWidth * 2 - height);
    const y = Math.random() * (pageHeight * .8 - height);
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy < r * r) {
      return;
    }

    const popupDelayMillis = (pageHeight - y) * 30;
    function Component(props: { side: PageSide }) {
      return (
        <div
            style={{
              width: '100%',
              top: `${y}vmin`,
              position: 'absolute',
              transform: `translateZ(${y/1000}vmin)`
            }}>
          <Scenery x={`${x - (props.side === PageSide.Left ? 0 : pageWidth)}vmin`}/>
        </div>
      );
    }
    return {
      Component,
      controller,
      popupDelayMillis,
    };
  }).filter(exists);
}

export function createRoomPage(
  spread: BookSpreadRoom,
) {
  const scenery = createScenery(spread);
  const ui: RoomPageUI = {
    scenery,
  };
  const controller = new RoomPageController(ui);
  function Component(props: { side: PageSide }) {
    return (
        <RoomPageComponent scenery={ui.scenery} side={props.side}/>
    );
  }
  return {
    controller,
    Component,
  };
}