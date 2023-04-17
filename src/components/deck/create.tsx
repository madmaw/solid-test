import { Card, Deck } from "model/domain";
import { Accessor, Component, For } from "solid-js";
import { DeckComponent } from "./deck";
import { DeckController } from "./deck_controller";

export function createDeck(deck: Accessor<Deck>, CardComponent: Component<{ model: Card }>) {

  const controller = new DeckController();

  function Component() {
    return (
      <DeckComponent>
        <For each={deck()}>
          {card => (
            <CardComponent model={card}/>
          )}
        </For>
      </DeckComponent>
    );
  }

  return {
    Component,
    controller,
  }
}
