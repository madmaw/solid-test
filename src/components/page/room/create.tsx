import { BookSpreadRoom, ChapterType, Game } from "model/domain";
import { RoomPageController, RoomPageUI } from "./room_page_controller";
import { RoomPageComponent } from "./room_page";
import { PageSide } from "../page_controller";
import { createRigidScenery } from "components/scenery/rigid/create";

import constants from '../../constants.module.scss';
import { exists } from "base/exists";
import { createUnicodeScenery } from "components/scenery/unicode/create";
import { UnreachableError } from "base/unreachable_error";

const pageWidth = parseInt(constants.pageWidth);
const pageHeight = parseInt(constants.pageHeight);

function getEmojis(chapterType: ChapterType) {
  switch (chapterType) {
    case ChapterType.Tutorial:
      return ['🪑', '🛏️', '🛋️', '🪴'];
    case ChapterType.Prelude:
    case ChapterType.Shop:
      return ['🏡', '🏠', '🌴'];
    case ChapterType.Forest:
      return ['🌲', '🌿'];
    case ChapterType.Ruins:
      return ['🏚️', '🛖', '🪨', '🌵'];
    case ChapterType.Tower:
      return ['x'];
    default:
      throw new UnreachableError(chapterType);
  }
}

function createScenery(spread: BookSpreadRoom, game: Game) {
  const cx = pageWidth;
  const cy = pageHeight;
  const r = spread.encounter != null ? pageWidth : 0; 

  const trees = Math.floor(Math.random() * 20) + 20;

  const emojis = getEmojis(game.book.chapter.type);

  // TODO make this into a factory
  return new Array(trees).fill(0).map(() => {
    const fontSize = Math.random() * pageHeight/8 + pageHeight/16;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const {
      Component,
      controller,
    } = createRigidScenery(
        createUnicodeScenery(emoji, fontSize),
        Math.random() > .5,
    );
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
  game: Game,
) {
  const scenery = createScenery(spread, game);
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