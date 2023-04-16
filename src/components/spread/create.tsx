import { AnimationManager } from "ui/animation/animation_manager";
import { SpreadComponent } from "./spread";
import { Animations, SpreadController } from "./spread_controller";
import { Component } from "solid-js";
import { BookSpread, CardSlot } from "model/domain";

export function createSpread({
  CardSlotsComponent,
}: {
  CardSlotsComponent: Component<{ model: readonly CardSlot[] }>,
}) {
  const animations = new AnimationManager<Animations>();
  const controller = new SpreadController();
  function Component(props: { model: BookSpread }) {
    return (
        <SpreadComponent
            animations={animations}
            CardSlotsComponent={CardSlotsComponent}
            spread={props.model}
        />
    );
  };

  return {
    controller,
    Component,
  }
}