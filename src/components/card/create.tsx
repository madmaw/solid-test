import { Card } from "model/domain";
import { Animations, CardController, FlipState, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { CardComponent } from "./card";
import { CardFaceComponent } from "./face/card_face";
import { ComponentManager } from "components/component_manager";

export function createCardManager() {
  function createCard(card: Card) {
    const animations = new AnimationManager<Animations>();
    const cardUI = cardUIDescriptor.create({
      flipState: FlipState.Flat,
      peeking: false,
    });
    function face() {
      const faces = card.type.faces; 
      return faces[(card.visibleFaceIndex + (cardUI.peeking ? 1 : 0))%faces.length];
    }

    function Component() {
      return (
        <CardComponent
            flipState={cardUI.flipState}
            elevated={cardUI.peeking || cardUI.flipState === FlipState.FlippingUpToVertical}
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
