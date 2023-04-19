import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { BookSpreadType, Card, CardFaceType, CardSlot, ChoiceType, EncounterDefinition, Game, RecycleTarget, bookSpreadRoomDescriptor, cardDescriptor, cardSlotDescriptor, entityDescriptor } from "model/domain";
import { calculateTargetCardEffectUsages, cardFace } from "./cards";
import { DeckHolder, allCardSlots, pageCardSlots, pageDeck, playerDeck } from "./games";
import { batch } from "solid-js";
import { delay } from "base/delay";
import { BookController } from "components/book/book_controller";
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
      await delay(500);
      // TODO apply effects
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
          await this.endTurn();
          return this.startTurn();
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
        targetCard: undefined,
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

  async startTurn(draw = 3) {
    const cardSlots = pageCardSlots(this.game);
    const [pageDeckGetter, pageDeckSetter] = pageDeck(this.game);
    cardSlots.forEach(cardSlot => {
      const deck = pageDeckGetter();
      if (deck.length > 0) {
        cardSlot.targetCard = deck[deck.length - 1];
        pageDeckSetter(deck.slice(0, -1));  
      }
    });

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
    // a delay (can be zero) is necessary so free cards render in their
    // face down state before auto-flipping
    await delay(500);
    await this.normalizeBoard();
  }

  async endTurn() {
    // place all loose cards back in the deck
    const pageDeckHolder = pageDeck(this.game);
    const playerDeckHolder = playerDeck(this.game);
    const cardSlots = allCardSlots(this.game);
    await batch<Promise<void>>(async () => {
      await Promise.all(cardSlots.flatMap(async cardSlot => {
        const inPlayerHand = this.game.playerHand.indexOf(cardSlot) >= 0;
        if (cardSlot.targetCard != null && inPlayerHand) {
          return [];
        }
        const playedCards = cardSlot.playedCards;
        cardSlot.playedCards = [];
        const targetCard = cardSlot.targetCard;
        if (!inPlayerHand && targetCard != null) {
          // TODO parallelise this promise
          await this.returnCardToDeck(targetCard, pageDeckHolder);
          cardSlot.targetCard = undefined;
        }
        if (playerDeckHolder != null) {
          await Promise.all(playedCards.map(async card => {
            // TODO player discard deck
            return this.returnCardToDeck(card, playerDeckHolder);
          }));  
        }
        return;
      }));
    });
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

  private async returnCardToDeck(
    card: Card,
    drawDeck: DeckHolder,
    discardDeck?: DeckHolder,
  ) {
    if (card.visibleFaceIndex > 0) {
      await this.cardControllerManger.lookupController(card)?.flip();
    }
    // TODO animate to target deck
    const recycleTarget = card.definition.recycleTarget;
    const targetDeck = recycleTarget === RecycleTarget.DiscardDeckTop
        ? discardDeck
        : drawDeck;
    if (targetDeck != null) {
      const [getDeck, setDeck] = targetDeck;
      const deck = getDeck();
      const deckLength = deck.length;
      const index = recycleTarget === RecycleTarget.DrawDeckBottom
          ? 0
          : recycleTarget === RecycleTarget.DrawDeckRandom
              ? Math.floor(Math.random() * (deckLength + 1))
              : deckLength
      setDeck([...deck.slice(0, index), card, ...deck.slice(index)]);
    }
  }
}


