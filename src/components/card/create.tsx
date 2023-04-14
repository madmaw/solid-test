import { Card } from "model/domain";
import { Animations, CardController, FlipState, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "base/animation_manager";
import { CardComponent } from "./card";
import { CardFaceComponent } from "./card_face";
import { ComponentManager } from "components/component_manager";

export function createCardManager() {
  function createCard(card: Card) {
    const animations = new AnimationManager<Animations>();
    function face() {
      return card.type.faces[card.visibleFaceIndex];
    }
    const cardUI = cardUIDescriptor.create({
      flipState: FlipState.Flat,
    });

    function Component() {
      return (
        <CardComponent
            flipState={cardUI.flipState}
            animations={animations}>
          <CardFaceComponent face={face()}/>
        </CardComponent>
      );
    }
  
    const controller = new CardController(card, cardUI, animations);
  
    return {
      Component,
      controller,
    };
  };
  return new ComponentManager(createCard);
}
