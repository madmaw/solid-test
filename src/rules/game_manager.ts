import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { Card, CardFaceType, CardSlot, Game } from "model/domain";
import { calculateTargetCardEffectUsages, cardFace } from "./cards";
import { allCardSlots } from "./games";
import { batch } from "solid-js";
import { delay } from "base/delay";

export class GameManager {
  constructor(
    private readonly game: Game,
    private readonly cardControllerManger: ControllerManger<Card, CardController>,
  ) {
    
  }

  async normalizeBoard() {
    const flippableCardSlots = allCardSlots(this.game)
        .filter(cardSlot => this.isAutoFlippable(cardSlot));
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

  async startTurn(draw = 3) {
    const availableSlots = this.game.cardSlots.reduce(
      (acc, slot) => acc + (slot.targetCard == null ? 1 : 0),
      0,
    );
    const availableDraw = Math.min(draw, availableSlots);
    const drawnCards = this.game.playerDeck.slice(-availableDraw);
    batch(() => {
      this.game.playerDeck = this.game.playerDeck.slice(0, -availableDraw);
      drawnCards.reverse().forEach(card => {
        const cardSlot = this.game.cardSlots.find(slot => slot.targetCard == null);
        if (cardSlot != null) {
          cardSlot.targetCard = card;
        }
      });
    });
    await delay(0);
    await this.normalizeBoard();
  }

  private isAutoFlippable(cardSlot: CardSlot): boolean {
    const targetCard = cardSlot.targetCard;
    if (targetCard == null) {
      return false;
    }
    const targetFace = cardFace(
        targetCard,
        !!this.cardControllerManger.lookupController(targetCard)?.isPeeking(),
    );
    if (targetFace.type !== CardFaceType.ChoiceBack && targetFace.type !== CardFaceType.ResourceBack) {
      return false;
    }
    return calculateTargetCardEffectUsages(cardSlot, this.cardControllerManger).cost.every(c => c.used);
  }
  
}


