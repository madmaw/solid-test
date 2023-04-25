import { BookSpread, BookSpreadType, Game } from "model/domain";
import { ComponentManager } from "components/component_manager";
import { NavigationTarget } from "components/navigation_target";
import { createToCPage } from "./toc/create";
import { UnreachableError } from "base/unreachable_error";
import { PageComponentManager, PageController, PageSide } from "./page_controller";
import { createRoomPage } from "./room/create";
import { createDeathPage } from "./death/create";

export function createPageManager(
    navigation: (to: NavigationTarget) => void,
    game: Game,
): PageComponentManager {
  function createPage(spread: BookSpread) {
    switch (spread.type) {
      case BookSpreadType.TableOfContents:
        return createToCPage(spread, navigation);
      case BookSpreadType.Room:
        return createRoomPage(spread, game);
      case BookSpreadType.Death:
        return createDeathPage(spread, navigation);
      default:
        throw new UnreachableError(spread);
    }
  }
  return new ComponentManager<BookSpread, PageController, { side: PageSide }>(
    createPage
  );
}
