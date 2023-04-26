import { BookSpreadTableOfContents } from "model/domain";
import { EmptyPageController, PageSide } from "../page_controller";
import { NavigationTarget } from "components/navigation_target";
import { ToCPageComponent } from "./toc_page";

export function createToCPage(
    spread: BookSpreadTableOfContents,
    navigation: (to: NavigationTarget) => void,
    onFocusUIElement: (id: unknown) => void,
) {
  const controller = new EmptyPageController();
  function Component(props: { side: PageSide }) {
    return (
        <ToCPageComponent
            navigation={navigation}
            onFocusUIElement={onFocusUIElement}
            side={props.side}
            spread={spread}/>
    );
  }
  return {
    controller,
    Component,
  };
}