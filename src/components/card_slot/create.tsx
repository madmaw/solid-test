import { Card, CardSlot, Game } from "model/domain";
import { CardSlotComponent as CardSlotComponentImpl } from "./card_slot";
import { CardSlotsComponent } from "./card_slots";
import { Accessor, Component, For } from "solid-js";
import { ComponentManager } from "components/component_manager";
import { CardSlotController, cardSlotUIDescriptor } from "./card_slot_controller";
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
    interactionManager: Accessor<InteractionManager>,
    game: Game,
) {
  function createCardSlot(cardSlot: CardSlot) {
    const cardSlotUI = cardSlotUIDescriptor.create({
      targetCardHidden: false,
    });
    const controller = new CardSlotController(cardSlotUI);
    function internalOnDragStart() {
      interactionManager().startDrag(cardSlot);
    } 
    function internalOnDrop() {
      interactionManager().drop(cardSlot);
    }
    function internalOnClick() {
      interactionManager().click(cardSlot);
    }
    
    function Component() {
      return (
          <CardSlotComponentImpl
              targetCard={cardSlot.targetCard
                  && !cardSlotUI.targetCardHidden
                  && <CardComponent
                      model={cardSlot.targetCard}
                  />
              }
              targetInteraction={interactionManager().allowedInteraction(cardSlot)}
              onDragStart={internalOnDragStart}
              onDrop={internalOnDrop}
              onClick={internalOnClick}
              bordered={game.playerHand.indexOf(cardSlot) >= 0}
              used={cardSlot.targetCard == null && cardSlot.playedCards.length > 0}
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
