import { ComponentManager } from "components/component_manager";
import { BookSpread } from "model/domain";

export const enum PageSide {
  Left = 1,
  Right,
}

export interface PageController {

  popup(): Promise<void>;

  popdown(): Promise<void>;
}


export class EmptyPageController implements PageController {
  async popup() {

  }

  async popdown() {

  }
}

export type PageComponentManager = ComponentManager<BookSpread, PageController, { side: PageSide }>;
