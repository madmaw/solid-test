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
import { TableController } from "components/table/table_controller";
import { CardSlotController } from "components/card_slot/card_slot_controller";

export class GameManager {
  constructor(
    private readonly game: Game,
    private readonly tableController: TableController,
    private readonly bookController: BookController,
    private readonly cardControllerManager: ControllerManger<Card, CardController>,
    private readonly cardSlotControllerManager: ControllerManger<CardSlot, CardSlotController>,
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
      await this.cardControllerManager.lookupController(targetCard)?.flip();
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
          return this.nextPage(undefined, cardSlot);
        case ChoiceType.NextPage:
          return this.nextPage(choice.encounter, cardSlot);
        case ChoiceType.NextTurn:
          // TODO
          const finishEndTurn = await this.endTurn(cardSlot);
          await finishEndTurn();
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

  private async applyUsages(
      usages: readonly EffectUsage[],
      direction: EffectDirection.Up | EffectDirection.Down,
      to: Entity,
  ) {
    for(const usage of usages) {
      if (!usage.used) {
        // direction can be used as a bitwise flag
        if (usage.effect.direction & direction) {
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

  async nextPage(
      encounter: EncounterDefinition | undefined,
      selectedCardSlot: CardSlot | undefined,
  ) {
    const finishEndTurn = await this.endTurn(selectedCardSlot);
    const spread = bookSpreadRoomDescriptor.create({
      type: BookSpreadType.Room,
      encounter: encounter && hydrateEncounter(encounter),
    });
    await this.bookController.showSpread(spread);
    await finishEndTurn();
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
      const controller = this.cardControllerManager.lookupController(targetCard);
      if (controller == null) {
        return;
      }
      return controller.flip();
    }));
  }

  private async startTurn(draw = 3) {
    const cardSlots = pageCardSlots(this.game);
    const [pageDeckGetter, pageDeckSetter] = pageDeck(this.game);
    await Promise.all(cardSlots.map(async cardSlot => {
      const deck = pageDeckGetter();
      if (deck.length > 0) {
        const card = deck[deck.length - 1];
        if (card != null) {
          cardSlot.targetCard = card;
          pageDeckSetter(deck.slice(0, -1));
          const cardController = this.cardControllerManager.lookupController(card);
          // it's no rendered yet, so this should put it at 90 degrees
          cardController?.flipUpToVertical();
          // force a render
          await delay(0);
          // animate
          await cardController?.flipDownFromVertical();
        }
      }
    }));

    const playerHand = this.game.playerHand;
    if (playerHand != null) {
      const availableSlots = playerHand.filter(
        slot => slot.targetCard == null && slot.playedCards.length === 0,
      );
      const availableDraw = Math.min(draw, availableSlots.length);
      const playerCharacter = this.game.playerCharacter;
      if (availableDraw > 0 && playerCharacter != null) {
        // NOTE: be careful not to remove above check because -0 == 0
        // in the below slice operations
        const drawnCards = playerCharacter.deck.slice(-availableDraw);
        const deckPosition = this.tableController.getPlayerDeckTablePosition();
        await batch(async () => {
          await Promise.all(
              drawnCards.reverse().map(async (card, i) => {
                const cardSlot = availableSlots[i];
                const slotIndex = playerHand.indexOf(cardSlot);
                const cardPosition = this.tableController.getCardSlotTablePosition(slotIndex);
                await this.cardControllerManager.lookupController(card)?.moveTo(
                    ...(cardPosition
                        .map((v, i) => v - deckPosition[i])
                        .map(v => `${v}vmin`) as [string, string, string])
                );
                cardSlot.targetCard = card;
              }),
          );
        });    
        playerCharacter.deck = playerCharacter.deck.slice(0, -availableDraw);
      }
    }
    // a delay (can be zero) is necessary so free cards render in their
    // face down state before auto-flipping
    await delay(500);
    await this.normalizeBoard();
  }

  private async endTurn(
      playedCardSlot: CardSlot | undefined,
  ): Promise<() => Promise<void>> {
    // if we're in battle and the monster is dead, clear the battle
    const battle = gameEncounterBattle(this.game);
    let dead = battle != null && battle.monster.health <= 0;
    if (dead && battle) {
      await this.battleEncounterControllerManager.lookupController(battle)?.die();
    }
    // place all loose cards back in the deck
    const pageDeckHolder = pageDeck(this.game);
    const playerDeckHolder = playerDeck(this.game);
    const cardSlots = allCardSlots(this.game)
        .filter(cardSlot => cardSlot !== playedCardSlot);

    const processCardSlot = async (cardSlot: CardSlot) => {
      const inPlayerHand = this.game.playerHand.indexOf(cardSlot) >= 0;
      const targetCard = cardSlot.targetCard;
      if (
          targetCard != null
              && inPlayerHand
              && targetCard.visibleFaceIndex > 0
              || playerDeckHolder == null
      ) {
        return [];
      }
      const cardSlotController = this.cardSlotControllerManager.lookupController(cardSlot);
      cardSlotController?.setForceUnrotate(true);
      const playedCards = cardSlot.playedCards;
      if (targetCard != null) {
        // TODO parallelise this promise
        await this.returnCardToDeck(
            targetCard,
            cardSlot,
            inPlayerHand ? playerDeckHolder : pageDeckHolder,
        );
        cardSlot.targetCard = undefined;
      }
      if (playerDeckHolder != null) {
        await Promise.all(playedCards.map(async card => {
          // TODO player discard deck
          return this.returnCardToDeck(card, cardSlot, playerDeckHolder);
        }));
        cardSlot.playedCards = [];
      }
      cardSlotController?.setForceUnrotate(false);
      return;
    }

    await batch<Promise<void>>(async () => {
      await Promise.all(cardSlots.flatMap(processCardSlot));
    });
    if (dead) {
      const spread = this.game.book.spread;
      if (spread?.type === BookSpreadType.Room) {
        spread.encounter = undefined;
      }
    }
    return async () => {
      if (playedCardSlot != null) {
        await processCardSlot(playedCardSlot);
      }  
    };
  }

  private isAutoFlippable(cardSlot: CardSlot): boolean {
    const targetCard = cardSlot.targetCard;
    if (targetCard == null) {
      return false;
    }
    const targetFace = cardFace(
        targetCard,
        !!this.cardControllerManager.lookupController(targetCard)?.isPeeking(),
    );
    if (targetFace.type !== CardFaceType.ChoiceBack && targetFace.type !== CardFaceType.ResourceBack) {
      return false;
    }
    return calculateTargetCardEffectUsages(cardSlot, this.cardControllerManager).cost.every(c => c.used);
  }

  private async returnCardToDeck(
    card: Card,
    cardSlot: CardSlot,
    drawDeck: DeckHolder,
    discardDeck?: DeckHolder,
  ) {
    const cardController = this.cardControllerManager.lookupController(card);
    const inPlayerHand = this.game.playerHand.indexOf(cardSlot) >= 0; 
    if (inPlayerHand || card !== cardSlot.targetCard) {
      if (card.visibleFaceIndex > 0) {
        await this.cardControllerManager.lookupController(card)?.flip();
      }
      // TODO factor in other decks
      const deckPosition = this.tableController.getPlayerDeckTablePosition();
      // TODO event cards
      const slotIndex = this.game.playerHand.indexOf(cardSlot);
      // TODO factor in whether it's a played or target card
      const cardPosition = this.tableController.getCardSlotTablePosition(slotIndex);
      await cardController?.moveTo(
          ...(cardPosition
              .map((v, i) => deckPosition[i] - v)
              .map(v => `${v}vmin`) as [string, string, string])
      );
    } else {
      await cardController?.flipUpToVertical();
    }
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


