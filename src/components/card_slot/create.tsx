import { Card, CardSlot } from "model/domain";
import { CardSlotComponent as CardSlotComponentImpl } from "./card_slot";
import { CardSlotsComponent } from "./card_slots";
import { Component, For } from "solid-js";
import { ComponentManager } from "components/component_manager";
import { CardSlotController } from "./card_slot_controller";
import { InteractionManager } from "rules/interaction_manager";

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

export function createCardSlotManager(
    CardComponent: Component<{ model: Card }>,
    interactionManager: InteractionManager
) {
  function createCardSlot(cardSlot: CardSlot) {
    const controller = new CardSlotController();
    const internalOnDragStart = () => interactionManager.startDrag(cardSlot);
    const internalOnDrop = () => interactionManager.drop(cardSlot);
    
    function Component() {
      return (
          <CardSlotComponentImpl
              targetCard={cardSlot.targetCard
                  && <CardComponent model={cardSlot.targetCard}/>
              }
              targetInteraction={interactionManager.allowedInteraction(cardSlot)}
              onDragStart={internalOnDragStart}
              onDrop={internalOnDrop}
          >
            <For each={cardSlot.playedCards}>
              {card => {
                return <CardComponent model={card}/>
              }}
            </For>
          </CardSlotComponentImpl>
      );
    }
    return {
      controller,
      Component,
    };
  };
  return new ComponentManager(createCardSlot);
}
