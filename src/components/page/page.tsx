import { BookSpread } from "model/domain";
import { PageSide } from "./page_controller";
import { NavigationTarget } from "components/navigation_target";

export type PageProps<T extends BookSpread = BookSpread> = {
  spread: T,
  side: PageSide,
  navigation: (target: NavigationTarget) => void,
};

