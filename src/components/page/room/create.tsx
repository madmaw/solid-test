import { BookSpreadRoom } from "model/domain";
import { RoomPageController, RoomPageUI, Scenery } from "./room_page_controller";
import { RoomPageComponent } from "./room_page";
import { PageSide } from "../page_controller";
import { createRigidScenery } from "components/scenery/rigid/create";
import { createUnicodeEntity } from "components/entity/unicode/create";

import styles from '../../constants.module.scss';

const pageWidth = parseInt(styles.pageWidth);
const pageHeight = parseInt(styles.pageHeight);

function createScenery(spread: BookSpreadRoom) {
  if (spread.encounter == null) {
    // want a clearing
  }
  const trees = Math.floor(Math.random() * 20) + 20;

  return new Array(trees).fill(0).map<Scenery>(() => {
    const height = Math.random() * pageHeight/8 + pageHeight/8;
    const {
      Component: Scenery,
      controller,
    } = createRigidScenery(createUnicodeEntity('🌲', `${height}vmin`));
    const y = Math.random() * (pageHeight * .8 - height);
    const popupDelayMillis = (pageHeight - y) * 30;
    const x = Math.random() * (pageWidth * 2 - height);
    function Component() {
      return (
        <div
            style={{
              left: `${x}vmin`,
              top: `${y}vmin`,
              position: 'absolute',
              transform: `translateZ(${y/1000}vmin)`
            }}>
          <Scenery/>
        </div>
      )
    }
    return {
      Component,
      controller,
      popupDelayMillis,
    };
  });
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