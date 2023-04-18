import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { BookSpreadType, Card, CardFaceType, CardSlot, Game, bookSpreadRoomDescriptor, cardDescriptor } from "model/domain";
import { calculateTargetCardEffectUsages, cardFace } from "./cards";
import { allCardSlots } from "./games";
import { batch } from "solid-js";
import { delay } from "base/delay";
import { BookController } from "components/book/book_controller";
import { cardNextRoom, cardNextRoomJammedDoor } from "data/initial";

export class GameManager {
  constructor(
    private readonly game: Game,
    private readonly cardControllerManger: ControllerManger<Card, CardController>,
    private readonly bookController: BookController,
  ) {
    
  }

  async chooseCard(card: Card) {
    const originalFace = cardFace(card, false);
    if (originalFace.type === CardFaceType.ChoiceBack) {
      await this.cardControllerManger.lookupController(card)?.flip();
    }
    const face = cardFace(card, false);
    if (face.type === CardFaceType.Choice) {
      this.nextPage();
    }

  }

  async nextPage() {
    await this.endTurn();
    const spread = bookSpreadRoomDescriptor.create({
      type: BookSpreadType.Room,
      cardSlots: [
        {
          targetCard: cardDescriptor.snapshot(Math.random() > .5 ? cardNextRoomJammedDoor: cardNextRoom),
          playedCards: [],
        },
        {
          targetCard: cardDescriptor.snapshot(Math.random() > .5 ? cardNextRoomJammedDoor: cardNextRoom),
          playedCards: [],
        },
        {
          targetCard: cardDescriptor.snapshot(Math.random() > .5 ? cardNextRoomJammedDoor: cardNextRoom),
          playedCards: [],
        },
      ],
    });
    await this.bookController.showSpread(spread);
    await this.startTurn();
  }

  async normalizeBoard() {
    const cardSlots = allCardSlots(this.game);
    const flippableCardSlots = cardSlots
        .filter(cardSlot => this.isAutoFlippable(cardSlot));
    // flip any paid for cards
    await Promise.all(flippableCardSlots.map(async cardSlot => {
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

  async endTurn() {
    // place all loose cards back in the deck
    const cardSlots = allCardSlots(this.game);
    await batch<Promise<void[]>>(() => {
      return Promise.all(cardSlots.flatMap(cardSlot => {
        if (cardSlot.targetCard != null && this.game.cardSlots.indexOf(cardSlot) >= 0) {
          return [];
        }
        const playedCards = cardSlot.playedCards;
        cardSlot.playedCards = [];
        return playedCards.map(async card => {
          if (card.visibleFaceIndex > 0) {
            await this.cardControllerManger.lookupController(card)?.flip();
          }
          // TODO animate back in
          this.game.playerDeck = [...this.game.playerDeck, card];
        });
      }));
    });
  }

  async startTurn(draw = 3) {
    const availableSlots = this.game.cardSlots.reduce(
      (acc, slot) => acc
          + (slot.targetCard == null && slot.playedCards.length === 0 ? 1 : 0),
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
    // delay 0 is necessary so free cards render in their face down state before
    // auto-flipping
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


