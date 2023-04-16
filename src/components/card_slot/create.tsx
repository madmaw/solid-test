import { Card, CardSlot } from "model/domain";
import { CardSlotComponent as CardSlotComponentImpl } from "./card_slot";
import { CardSlotsComponent } from "./card_slots";
import { Component, For } from "solid-js";
import { ComponentManager } from "components/component_manager";
import { CardSlotController } from "./card_slot_controller";

export function createCardSlots(
  CardSlotComponent: Component<{ model: CardSlot }>,
) {
  const Component = (props : {
    model: readonly CardSlot[],
  }) => {
    return (
      <CardSlotsComponent
        CardSlotComponent={CardSlotComponent}
        cardSlots={props.model}/>
    );
  };
  return {
    Component,
  };
}

export function createCardSlotManager(CardComponent: Component<{ model: Card }>) {
  function createCardSlot(cardSlot: CardSlot) {
    function Component() {
      return (
        <CardSlotComponentImpl targetCard={cardSlot.targetCard && <CardComponent model={cardSlot.targetCard}/>}>
          <For each={cardSlot.playedCards}>
            {card => {
              return <CardComponent model={card}/>
            }}
          </For>
        </CardSlotComponentImpl>
      );
    }
    const controller = new CardSlotController();
    return {
      controller,
      Component,
    };
  };
  return new ComponentManager(createCardSlot);

}
