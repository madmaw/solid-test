import { BookSpreadRoom } from "model/domain";
import { RoomPageController, RoomPageUI } from "./room_page_controller";
import { RoomPageComponent } from "./room_page";
import { PageSide } from "../page_controller";
import { createRigidScenery } from "components/scenery/rigid/create";

import constants from '../../constants.module.scss';
import { exists } from "base/exists";
import { createUnicodeScenery } from "components/scenery/unicode/create";

const pageWidth = parseInt(constants.pageWidth);
const pageHeight = parseInt(constants.pageHeight);

function createScenery(spread: BookSpreadRoom) {
  const cx = pageWidth;
  const cy = pageHeight;
  const r = spread.encounter != null ? pageWidth : 0; 

  const trees = Math.floor(Math.random() * 20) + 20;

  // TODO make this into a factory
  return new Array(trees).fill(0).map(() => {
    const fontSize = Math.random() * pageHeight/8 + pageHeight/8;
    const {
      Component,
      controller,
    } = createRigidScenery(createUnicodeScenery('🌲', fontSize));
    const [width, height] = controller.dimensions;
    const x = Math.random() * (pageWidth * 2 - width);
    const y = Math.random() * (pageHeight * .8 - height);
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy < r * r) {
      return;
    }
    const popupDelayMillis = (pageHeight - y) * 30;
    return {
      Component,
      controller,
      popupDelayMillis,
      x,
      y,
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