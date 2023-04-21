import { BookSpread, BookSpreadType } from "model/domain";
import { ComponentManager } from "components/component_manager";
import { NavigationTarget } from "components/navigation_target";
import { createToCPage } from "./toc/create";
import { UnreachableError } from "base/unreachable_error";
import { PageComponentManager, PageController, PageSide } from "./page_controller";
import { createRoomPage } from "./room/create";

export function createPageManager(
    navigation: (to: NavigationTarget) => void,
): PageComponentManager {
  function createPage(spread: BookSpread) {
    switch (spread.type) {
      case BookSpreadType.TableOfContents:
        return createToCPage(spread, navigation);
      case BookSpreadType.Room:
        return createRoomPage(spread);
      default:
        throw new UnreachableError(spread);
    }
  }
  return new ComponentManager<BookSpread, PageController, { side: PageSide }>(
    createPage
  );
}
