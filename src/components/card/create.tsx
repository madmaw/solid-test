import { Card } from "model/domain";
import { Animations, CardController, FlipState, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { CardComponent } from "./card";
import { CardFaceComponent } from "./face/card_face";
import { ComponentManager } from "components/component_manager";
import { cardFace } from "rules/card";

export function createCardManager() {
  function createCard(card: Card) {
    const animations = new AnimationManager<Animations>();
    const cardUI = cardUIDescriptor.create({
      flipState: FlipState.Flat,
      peeking: false,
    });

    function Component() {
      return (
        <CardComponent
            flipState={cardUI.flipState}
            elevated={cardUI.peeking || cardUI.flipState === FlipState.FlippingUpToVertical}
            animations={animations}>
          <CardFaceComponent
              face={cardFace(card, cardUI.peeking ? 1 : 0)}
              cardType={card.type}
          />
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
