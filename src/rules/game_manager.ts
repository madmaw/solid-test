import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import {
  BookSpreadType,
  Card,
  CardFaceType,
  CardSlot,
  ChoiceType,
  EffectDirection,
  EncounterBattle,
  EncounterDefinition,
  Entity,
  Game,
  RecycleTarget,
  SymbolType,
  bookSpreadRoomDescriptor,
  cardSlotDescriptor,
  entityDescriptor,
} from "model/domain";
import {
  EffectUsage,
  calculateCardEffectUsages,
  calculateTargetCardEffectUsages,
  cardFace,
} from "./cards";
import {
  DeckHolder,
  allCardSlots,
  gameEncounterBattle,
  pageCardSlots,
  pageDeck,
  playerDeck,
} from "./games";
import { batch } from "solid-js";
import { delay } from "base/delay";
import { BookController } from "components/book/book_controller";
import { defaultPlayerCharacter } from "data/player/initial";
import { UnreachableError } from "base/unreachable_error";
import { hydrateEncounter } from "./encounters";
import { EntityController } from "components/entity/entity_controller";

export class GameManager {
  constructor(
    private readonly game: Game,
    private readonly bookController: BookController,
    private readonly cardControllerManger: ControllerManger<Card, CardController>,
    private readonly battleEncounterControllerManager: ControllerManger<EncounterBattle, EntityController>, 
  ) {
    
  }

  async chooseTargetCard(cardSlot: CardSlot) {
    const targetCard = cardSlot.targetCard;
    if (targetCard == null) {
      return;
    }

    const originalFace = cardFace(targetCard, false);
    if (originalFace.type === CardFaceType.ChoiceBack) {
      await this.cardControllerManger.lookupController(targetCard)?.flip();
      await delay(500);
      // TODO apply effects
    }

    const battle = gameEncounterBattle(this.game);
    if (battle != null) {
      const face = cardFace(targetCard, false);
      await this.battleEncounterControllerManager.lookupController(battle)?.perform(face);
    }
    await this.applyCardEffects(cardSlot);

    const face = cardFace(targetCard, false);
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

  async applyCardEffects(cardSlot: CardSlot) {
    const targetCard = cardSlot.targetCard;
    const playerCharacter = this.game.playerCharacter;
    if (targetCard == null || playerCharacter == null) {
      return;
    }
    const cardUsages = calculateTargetCardEffectUsages(cardSlot, undefined);
    await this.applyUsages(cardUsages.cost, EffectDirection.Down, playerCharacter);
    // is there a monster, and is the slot in the monsters hand?
    const battle = gameEncounterBattle(this.game);
    if (battle == null || this.game.playerHand.indexOf(cardSlot) >= 0) {
      return;
    }
    await this.applyUsages(cardUsages.benefit, EffectDirection.Up, battle.monster);
    // also apply the cards
    for (const playedCard of cardSlot.playedCards) {
      const playedCardUsages = calculateCardEffectUsages(this.game, playedCard, undefined);
      await this.applyUsages(playedCardUsages.benefit, EffectDirection.Up, battle.monster);
    }
  }

  private async applyUsages(usages: readonly EffectUsage[], direction: EffectDirection, to: Entity) {
    for(const usage of usages) {
      if (!usage.used) {
        if (usage.effect.direction === direction) {
          switch (usage.effect.symbol) {
            case SymbolType.Damage:
              to.health--;
              break;
          }
        }
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
    const battleEncounter = gameEncounterBattle(this.game);
    if (battleEncounter != null) {
      await this.battleEncounterControllerManager
          .lookupController(battleEncounter)
          ?.appear();
    }
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
    // if we're in battle and the monster is dead, clear the battle
    const battle = gameEncounterBattle(this.game);
    let dead = battle != null && battle.monster.health <= 0;
    if (dead && battle) {
      await this.battleEncounterControllerManager.lookupController(battle)?.die();
    }
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
    if (dead) {
      const spread = this.game.book.spread;
      if (spread?.type === BookSpreadType.Room) {
        spread.encounter = undefined;
      }
    }
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


