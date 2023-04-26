import { BookSpreadDeath } from "model/domain";
import { EmptyPageController, PageSide } from "../page_controller";
import { NavigationTarget } from "components/navigation_target";
import { DeathPageComponent } from "./death_page";

export function createDeathPage(
  spread: BookSpreadDeath,
  navigation: (to: NavigationTarget) => void,
  onFocusUIElement: (id: unknown) => void,
) {
  const controller = new EmptyPageController();
  function Component(props: { side: PageSide }) {
    return (
      <DeathPageComponent
          side={props.side}
          navigation={navigation}
          spread={spread}
          onFocusUIElement={onFocusUIElement}
          />
    );
  }
  return {
    controller,
    Component,
  };
}
