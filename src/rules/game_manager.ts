import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { BookSpreadType, Card, CardFaceType, CardSlot, Effect, Game } from "model/domain";
import { cardFace } from "./card";

export class GameManager {
  constructor(
    private readonly game: Game,
    private readonly cardControllerManger: ControllerManger<Card, CardController>,
  ) {
    
  }

  async normalizeBoard() {
    const spread = this.game.book.spread;
    const bookSlots = spread?.type === BookSpreadType.Room
        ? spread.cardSlots
        : [];
    const flippableCardSlots = [...this.game.cardSlots, ...bookSlots]
        .filter(isAutoFlippable);
    return Promise.all(flippableCardSlots.map(async cardSlot => {
      const targetCard = cardSlot.targetCard;
      if (targetCard == null) {
        return;
      }
      const controller = this.cardControllerManger.lookupController(targetCard);
      if (controller == null) {
        return;
      }
      return controller.flip();
    }));
  }

}

function isAutoFlippable(cardSlot: CardSlot): boolean {
  const targetCard = cardSlot.targetCard;
  if (targetCard == null) {
    return false;
  }
  const targetFace = cardFace(targetCard);
  if (targetFace.type !== CardFaceType.ChoiceBack && targetFace.type !== CardFaceType.ResourceBack) {
    return false;
  }
  const playedCardEffectTotals = calculatePlayedCardEffectTotals(cardSlot);
  return targetFace.cost.every(effect => {
    const total = playedCardEffectTotals.get(effect) || 0;
    if (total > 0) {
      playedCardEffectTotals.set(effect, total - 1);
      return true;
    }
    return false;
  })
}

function calculatePlayedCardEffectTotals(cardSlot: CardSlot): Map<Effect, number> {
  return cardSlot.playedCards.reduce((acc, card) => {
    const face = cardFace(card);
    if (face.type === CardFaceType.Resource) {
      return face.benefit.reduce((acc, effect) => {
        const count = acc.get(effect) || 0;
        acc.set(effect, count+1);
        return acc;
      }, acc);
    }
    return acc;
  }, new Map<Effect, number>());
}

