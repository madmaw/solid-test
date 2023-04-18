import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { BookSpreadType, Card, CardFaceType, CardSlot, ChoiceType, EncounterDefinition, Game, bookSpreadRoomDescriptor, cardDescriptor, cardSlotDescriptor, entityDescriptor } from "model/domain";
import { calculateTargetCardEffectUsages, cardFace } from "./cards";
import { allCardSlots } from "./games";
import { batch } from "solid-js";
import { delay } from "base/delay";
import { BookController } from "components/book/book_controller";
import { nextRoomCards } from "data/room/cards/next_room";
import { defaultPlayerCharacter } from "data/player/initial";
import { UnreachableError } from "base/unreachable_error";
import { hydrateEncounter } from "./encounters";

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
      const choice = face.choice;
      switch (choice.type) {
        case ChoiceType.NextChapter:
          // TODO 
          return this.nextPage(undefined);
        case ChoiceType.NextPage:
          return this.nextPage(choice.encounter);
        case ChoiceType.NextTurn:
          // TODO 
          return this.nextPage(undefined);
        default:
          throw new UnreachableError(choice);
      }
    }
  }

  async createPlayer() {
    this.game.playerCharacter = entityDescriptor.create(defaultPlayerCharacter);
  }


  async nextPage(encounter: EncounterDefinition | undefined) {
    await this.endTurn();
    const spread = bookSpreadRoomDescriptor.create({
      type: BookSpreadType.Room,
      encounter: encounter && hydrateEncounter(encounter),
      cardSlots: new Array(3).fill(0).map(() => cardSlotDescriptor.freeze({
        targetCard: cardDescriptor.freeze({
          definition: nextRoomCards[Math.floor(Math.random() * nextRoomCards.length)],
          visibleFaceIndex: 0,
        }),
        playedCards: [],
      })),
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
        if (cardSlot.targetCard != null
            && this.game.playerCharacter != null
            && this.game.playerHand.indexOf(cardSlot) >= 0
        ) {
          return [];
        }
        const playedCards = cardSlot.playedCards;
        cardSlot.playedCards = [];
        return playedCards.map(async card => {
          if (card.visibleFaceIndex > 0) {
            await this.cardControllerManger.lookupController(card)?.flip();
          }
          // TODO animate back in
          if (this.game.playerCharacter != null) {
            this.game.playerCharacter.deck = [...this.game.playerCharacter.deck, card];
          }
        });
      }));
    });
  }

  async startTurn(draw = 3) {
    const playerHand = this.game.playerHand;
    if (playerHand != null) {
      const availableSlots = playerHand.filter(
        slot => slot.targetCard == null && slot.playedCards.length === 0,
      );
      const availableDraw = Math.min(draw, availableSlots.length);
      const playerCharacter = this.game.playerCharacter;
      if (availableDraw > 0 && playerCharacter != null) {
        // NOTE: be careful not to remove above check because -0 == 0
        // in the below slide operations
        const drawnCards = playerCharacter.deck.slice(-availableDraw);
        batch(() => {
          playerCharacter.deck = playerCharacter.deck.slice(0, -availableDraw);
          drawnCards.reverse().forEach((card, i) => {
            const cardSlot = availableSlots[i];
            cardSlot.targetCard = card;
          });
        });    
      }
    }
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


