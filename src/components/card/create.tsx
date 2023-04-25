import { Card, Game } from "model/domain";
import { Animations, CardController, FlipState, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { CardComponent } from "./card";
import { CardFaceComponent } from "./face/card_face";
import { ComponentManager } from "components/component_manager";
import { createMemo } from "solid-js";
import { calculateCardEffectUsages, cardFace } from "rules/cards";

export function createCardManager(game: Game) {
  function createCard(card: Card) {
    const animations = new AnimationManager<Animations>();
    const cardUI = cardUIDescriptor.create({
      flipState: FlipState.Flat,
      peeking: false,
      warning: false,
      offset: undefined,
      elevated: false,
    });

    function Component() {

      const usage = createMemo(() => {
        return calculateCardEffectUsages(game, card, cardManager);
      });
  
      return (
        <CardComponent
            flipState={cardUI.flipState}
            elevated={
                cardUI.peeking
                    || cardUI.flipState === FlipState.FlippingUpToVertical
                    || cardUI.elevated
            }
            animations={animations}
            offset={cardUI.offset}>
          <CardFaceComponent
              face={cardFace(card, cardUI.peeking)}
              cost={usage().cost}
              benefit={usage().benefit}
              warning={cardUI.warning}
              choice={game.book.cardSlots.some(cardSlot => cardSlot.targetCard === card)}
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
  const cardManager = new ComponentManager(createCard);
  return cardManager;
}
