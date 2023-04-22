import { PageController, PageSide } from "../page_controller";
import { SceneryController } from "components/scenery/scenery_controller";
import { delay } from "base/delay";
import { maxBy, minBy } from 'base/max_by';
import { Component } from "solid-js";

export type Scenery = {
  Component: Component<{ x: string }>,
  controller: SceneryController,
  x: number,
  y: number,
  popupDelayMillis: number,
}

export type RoomPageUI = {
  scenery: readonly Scenery[];
};

export class RoomPageController implements PageController {
  constructor(private readonly ui: RoomPageUI) {

  }


  async popup(): Promise<void> {
    const minPopupDelay = minBy(this.ui.scenery, s => s.popupDelayMillis) || 0;
    await Promise.all(
        this.ui.scenery.map(async scenery => {
          await delay(scenery.popupDelayMillis - minPopupDelay);
          await scenery.controller.popup();
        }),
    );
  }

  async popdown(): Promise<void> {
    const maxPopupDelay = maxBy(this.ui.scenery, s => s.popupDelayMillis) || 0;
    await Promise.all(
        this.ui.scenery.map(async scenery => {
          await delay(maxPopupDelay - scenery.popupDelayMillis);
          await scenery.controller.popdown();
        }),
    );
  }
}