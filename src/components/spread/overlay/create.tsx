import { SpreadOverlayComponent } from "./spread_overlay";
import { Component } from "solid-js";
import { BookSpread, CardSlot } from "model/domain";

export function createSpreadOverlay({
  CardSlotsComponent,
}: {
  CardSlotsComponent: Component<{ model: readonly CardSlot[] }>,
}) {
  function Component(props: { model: BookSpread }) {
    return (
        <SpreadOverlayComponent
            CardSlotsComponent={CardSlotsComponent}
            spread={props.model}
        />
    );
  };

  return {
    Component,
  }
}