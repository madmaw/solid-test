import { CardController, Easing } from "components/card/card_controller";
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
  EncounterEvent,
  EncounterType,
  Entity,
  Game,
  RecycleTarget,
  SymbolType,
  bookSpreadRoomDescriptor,
  cardDescriptor,
  chapterDescriptor,
  entityDescriptor,
} from "model/domain";
import {
  EffectUsage,
  calculateCardEffectUsages,
  calculateTargetCardEffectUsages,
  cardFace,
  cardSlotForCard,
  sortCardsByRecycling,
} from "./cards";
import {
  DeckHolder,
  allCardSlots,
  gameEncounterBattle,
  gameEncounterEvent,
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
import { NavigationTarget, NavigationTargetType } from "components/navigation_target";
import { chapter as chapterPrelude } from "data/chapters/prelude/chapter";
import { chapter as chapterForest } from 'data/chapters/forest/chapter';
import { chapter as chapterRuins } from "data/chapters/ruins/chapter";
import { arrayRandomize } from "base/arrays";
import { Speaker } from "ui/speaker/speaker";
import { exists } from "base/exists";

export class GameManager {
  constructor(
    private readonly speaker: Speaker,
    private readonly game: Game,
    private readonly navigation: (to: NavigationTarget) => Promise<void>,
    private readonly tableController: TableController,
    private readonly bookController: BookController,
    private readonly cardControllerManager: ControllerManger<Card, CardController>,
    private readonly cardSlotControllerManager: ControllerManger<CardSlot, CardSlotController>,
    private readonly battleEncounterControllerManager: ControllerManger<EncounterBattle, EntityController>, 
    private readonly eventEncounterControllerManager: ControllerManger<EncounterEvent, EntityController>, 
  ) {
    
  }

  async chooseTargetCard(cardSlot: CardSlot) {
    const targetCard = cardSlot.targetCard;
    if (targetCard == null || this.game.playerHand.indexOf(cardSlot) >= 0) {
      return;
    }

    const originalFace = cardFace(targetCard, false);
    const cardController = this.cardControllerManager.lookupController(targetCard);
    if (
        originalFace.type === CardFaceType.ChoiceBack
            || originalFace.type === CardFaceType.Choice
    ) {
      cardController?.setElevated(true);
      cardSlot.playedCards.forEach(
          card => this.cardControllerManager.lookupController(card)?.setElevated(true),
      );
    }
    if (originalFace.type === CardFaceType.ChoiceBack) {
      await cardController?.flip();

      await delay(500);
      // TODO apply effects
    }

    const face = cardFace(targetCard, false);
    if (face.description) {
      this.speaker.say(face.description)
    }

    const battle = gameEncounterBattle(this.game);
    if (battle != null) {
      await this.battleEncounterControllerManager.lookupController(battle)?.perform(face);
    }
    await this.applyCardEffects(cardSlot);

    if (face.type === CardFaceType.Choice) {

      const choice = face.choice;
      switch (choice.type) {
        case ChoiceType.NextChapter:
          this.createChapter(choice.targetChapterIndex);
          return this.nextPage(choice.encounter, cardSlot);
        case ChoiceType.NextPage:
          return this.nextPage(choice.encounter, cardSlot);
        case ChoiceType.NextTurn:
          // TODO
          const {
            playerDead,
            finishEndTurn,
          } = await this.endTurn(cardSlot);
          await finishEndTurn();
          if (!playerDead) {
            return this.startTurn();
          }
          break;
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
    const targetFace = cardFace(targetCard, false);
    const cardUsages = calculateTargetCardEffectUsages(targetFace, cardSlot, undefined);
    await this.applyUsages(targetCard, cardUsages.cost, EffectDirection.Down, playerCharacter);
    // is there a monster, and is the slot in the monsters hand?
    const battle = gameEncounterBattle(this.game);
    if (battle == null || this.game.playerHand.indexOf(cardSlot) >= 0) {
      return;
    }
    await this.applyUsages(targetCard, cardUsages.benefit, EffectDirection.Up, battle.monster);
    // also apply the cards
    for (const playedCard of cardSlot.playedCards) {
      const playedCardUsages = calculateCardEffectUsages(this.game, playedCard, undefined);
      await this.applyUsages(playedCard, playedCardUsages.benefit, EffectDirection.Up, battle.monster);
    }
  }

  private async applyUsages(
      card: Card,
      usages: readonly EffectUsage[],
      direction: EffectDirection.Up | EffectDirection.Down,
      to: Entity,
  ) {
    const cardSlot = cardSlotForCard(this.game, card);
    const playerCharacter = this.game.playerCharacter;
    if (playerCharacter == null) {
      return;
    }
    const face = cardFace(card, false);
    await Promise.all([
      (async () => {
        if (face.description
            && usages.some(
                ({ used, effect: { direction: effectDirection } }) => (
                    !used && (effectDirection & direction) 
                        || used && !(effectDirection & direction)
                )
            )
        ) {
          await this.speaker.say(face.description);
        }  
      })(),
      (async () => {
        const cardController = this.cardControllerManager.lookupController(card);
        for(const usage of usages) {
          if (!usage.used) {
            // direction can be used as a bitwise flag
            if (usage.effect.direction & direction) {
              switch (usage.effect.symbol) {
                case SymbolType.GainCards:
                  const newCards = sortCardsByRecycling(usage.effect.cards.map(definition => {
                    return cardDescriptor.create({
                      ...definition,
                      visibleFaceIndex: 0,
                    })
                  }));
                  to.deck = [...newCards, ...to.deck];
                  break;
                case SymbolType.LoseCards:
                  // set all played cards in the slot to destroy
                  if (cardSlot != null) {
                    cardSlot.playedCards.forEach(playedCard =>
                      playedCard.recycleTarget = RecycleTarget.Destroy
                    );
                  }
                  break;
                case SymbolType.Damage:
                case SymbolType.Poison:
                  // give previous time to move back
                  await delay(300);
                  await cardController?.moveTo(
                      '0',
                      direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                      '1vmin',
                      Easing.Violent,
                  );
                  to.health--;
                  break;
                case SymbolType.Healing:
                  if (to.health < to.maxHealth) {
                    await delay(300);
                    await cardController?.moveTo(
                        '0',
                        direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                        '1vmin',
                        Easing.Gentle,
                    );
                    to.health = to.health + 1;  
                  }
                  break;
                case SymbolType.Finesse:
                case SymbolType.Force:
                case SymbolType.Mind:
                case SymbolType.Magic:
                case SymbolType.Perception:
                  // attack the cards
                  if (to !== playerCharacter) {
                    return;
                  }
                  const cardSlots = this.game.playerHand;
                  // find the best card to remove
                  const cardAndCardSlot = cardSlots.reduce<[Card, CardSlot] | undefined>(
                    (acc, cardSlot) => {
                      const targetCard = cardSlot.targetCard;
                      if (targetCard != null && targetCard !== card) {
                        const playedCard = cardSlot.playedCards
                            .find(card => cardFace(card, false).symbol === usage.effect.symbol);
                        const card = playedCard
                            || (cardFace(targetCard, false).symbol === usage.effect.symbol
                                ? targetCard
                                : undefined
                            );
                        return card != null ? [card, cardSlot] : acc;
                      }
                      return acc;
                    },
                    undefined,
                  );
                  if (cardAndCardSlot) {
                    const [card, cardSlot] = cardAndCardSlot;
                    await delay(300);
                    // TODO aim for the card
                    await cardController?.moveTo(
                        '0',
                        direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                        '1vmin',
                        Easing.Violent,
                    );
                    await this.returnCardToDeck(
                        card,
                        cardSlot,
                        [
                          () => playerCharacter.deck,
                          deck => playerCharacter.deck = deck,
                        ],
                        undefined,
                        true,
                    );
                  }
                  break;
                case SymbolType.Age:
                  await cardController?.moveTo(
                      '0',
                      direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                      '1vmin',
                      Easing.Gentle,
                  );
                  to.age -= 7;
                  break;
                case SymbolType.GainMaxHealth:
                  await cardController?.moveTo(
                      '0',
                      direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                      '1vmin',
                      Easing.Gentle,
                  );
                  to.maxHealth++;                  
                  break;
                case SymbolType.LoseMaxHealth:
                  await cardController?.moveTo(
                      '0',
                      direction === EffectDirection.Down ? '20vmin' : '-20vmin',
                      '1vmin',
                      Easing.Violent,
                  );
                  to.maxHealth--;
                  if (to.health > to.maxHealth) {
                    to.health = to.maxHealth;
                  }
                  break;
                case SymbolType.Draw:
                  // TODO
                  break;
                case SymbolType.DoubleCard:
                  if (cardSlot != null && cardSlot.playedCards.length > 0) {
                    const upgradeCard = cardSlot.playedCards[Math.floor(Math.random() * cardSlot.playedCards.length)];
                    upgradeCard.faces = upgradeCard.faces.map(face => ({
                      ...face,
                      cost: face.cost.flatMap(c => [c, c]),
                      benefit: face.type === CardFaceType.Resource
                          ? face.benefit.flatMap(b => [b, b])
                          : []
                    }));
                  }
                  break;
                case SymbolType.Duplicate:
                  if (cardSlot != null) {
                    to.deck = [
                      ...cardSlot.playedCards.map(playedCard => cardDescriptor.create(
                        cardDescriptor.snapshot(playedCard)
                      )),
                      ...to.deck,
                    ];
                  }
                  break;
                default:
                  throw new UnreachableError(usage.effect);
              }
            }
          }
        }
      })(),
    ]);
    await this.normalizeBoard();
  }

  async maybeCreatePlayer() {
    if (this.game.playerCharacter == null) {
      this.game.playerCharacter = entityDescriptor.create(defaultPlayerCharacter);
      this.game.playerCharacter.deck = arrayRandomize(this.game.playerCharacter.deck);
    }
  }

  async createChapter(chapterIndex: number) {
    const chapters = [chapterPrelude, chapterForest, chapterRuins];
    batch(() => {
      this.game.book.chapter = chapterDescriptor.create(chapters[chapterIndex % chapters.length]);
      this.game.book.chapter.deck = arrayRandomize(this.game.book.chapter.deck);
    });
  }

  async nextPage(
      encounter: EncounterDefinition | undefined,
      selectedCardSlot: CardSlot | undefined,
  ) {
    const { finishEndTurn, playerDead } = await this.endTurn(selectedCardSlot);
    if (this.game.playerCharacter) {
      this.game.playerCharacter.age++;
    }
    if (playerDead) {
      return finishEndTurn();
    }
    this.game.book.chapter.pagesRemaining--;
    const spread = bookSpreadRoomDescriptor.create({
      type: BookSpreadType.Room,
      encounter: encounter && hydrateEncounter(encounter),
    });
    await this.bookController.showSpread(spread);
    await finishEndTurn();
    const battleEncounter = gameEncounterBattle(this.game);
    const eventEncounter = gameEncounterEvent(this.game);
    if (battleEncounter != null) {
      await this.battleEncounterControllerManager
          .lookupController(battleEncounter)
          ?.appear();
    }
    if (eventEncounter != null) {
      await this.eventEncounterControllerManager
          .lookupController(eventEncounter)
          ?.appear();
    }
    
    await this.startTurn();
  }

  async normalizeBoard() {
    const cardSlots = allCardSlots(this.game);
    const flippableCardSlots = cardSlots
        .filter(cardSlot => this.isAutoFlippable(cardSlot));
    // find a phrase to say
    const description = flippableCardSlots.map(cardSlot => {
      const targetCard = cardSlot.targetCard;
      if (targetCard == null || targetCard.visibleFaceIndex > 0) {
        return;
      }
      const targetFace = cardFace(targetCard, false);
      return targetFace.description;
    }).filter(exists)[0];
    if (description != null) {
      this.speaker.say(description);
    }
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
    if (this.game.book.chapter.pagesRemaining < 0) {
      // create the end boss
      const card = this.game.book.chapter.finalCard;
      cardSlots[Math.floor(cardSlots.length/2)].targetCard = card;
    } else {
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
    }
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
                const cardPosition = this.tableController.getPlayerCardSlotTablePosition(slotIndex);
                await this.cardControllerManager.lookupController(card)?.moveTo(
                    ...(cardPosition
                        .map((v, i) => v - deckPosition[i])
                        .map(v => `${v}vmin`) as [string, string, string]),
                    Easing.Gentle,
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
    await delay(300);
    await this.normalizeBoard();
  }

  private async endTurn(
      playedCardSlot: CardSlot | undefined,
  ): Promise<{
    playerDead: boolean,
    finishEndTurn: () => Promise<void>
  }> {
    // if we're in battle and the monster is dead, clear the battle
    const battle = gameEncounterBattle(this.game);
    let monsterDead = battle != null && battle.monster.health <= 0;
    if (monsterDead && battle) {
      await this.battleEncounterControllerManager
          .lookupController(battle)?.die();
    }
    const event = gameEncounterEvent(this.game);
    if (event != null) {
      await this.eventEncounterControllerManager
          .lookupController(event)?.disappear();
    }
    // place all loose cards back in the deck
    const pageDeckHolder = pageDeck(this.game);
    const playerDeckHolder = playerDeck(this.game);

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

    const playerCharacter = this.game.playerCharacter;
    const playerDead = playerCharacter == null || playerCharacter.health <= 0;

    const cardSlots = allCardSlots(this.game)
        .filter(cardSlot => playerDead || cardSlot !== playedCardSlot);
    await batch<Promise<void>>(async () => {
      await Promise.all(cardSlots.flatMap(processCardSlot));
    });
    if (monsterDead) {
      const spread = this.game.book.spread;
      if (spread?.type === BookSpreadType.Room) {
        spread.encounter = undefined;
      }
    }
    if (this.game.book.spread?.type === BookSpreadType.Room
          && this.game.book.spread.encounter?.type === EncounterType.Event
    ) {
      this.game.book.spread.encounter = undefined;  
    }
    if (playerDead) {
      await this.playerDeath();
    }
    return {
      playerDead,
      finishEndTurn: async () => {
        if (playedCardSlot != null) {
          await processCardSlot(playedCardSlot);
        }
      },
    };
  }

  private isAutoFlippable(cardSlot: CardSlot): boolean {
    const targetCard = cardSlot.targetCard;
    if (targetCard == null) {
      return false;
    }
    const targetFace = cardFace(targetCard, false);
    const paymentFace = targetCard.faces[0];
    const isFlipped = targetCard.visibleFaceIndex > 0;
    const isFullyUsed = calculateTargetCardEffectUsages(
      paymentFace,
        cardSlot,
        this.cardControllerManager
    ).cost.every(c => c.used);
    return !isFullyUsed && isFlipped && targetFace.type !== CardFaceType.Choice
        || isFullyUsed && !isFlipped;
  }

  private async returnCardToDeck(
    card: Card,
    cardSlot: CardSlot,
    drawDeck: DeckHolder,
    discardDeck?: DeckHolder,
    endOfDeck?: boolean,
  ) {
    const cardController = this.cardControllerManager.lookupController(card);
    const inPlayerHand = this.game.playerHand.indexOf(cardSlot) >= 0; 
    cardController?.setElevated(false);
    const recycleTarget = card.recycleTarget;
    const targetDeck = card.recycleTarget === RecycleTarget.Destroy 
        ? undefined
        : recycleTarget === RecycleTarget.Discard
            ? discardDeck
            : drawDeck;

    const animateReturnToDeck = (inPlayerHand || card !== cardSlot.targetCard)
        && targetDeck != null;
    if (animateReturnToDeck) {
      if (card.visibleFaceIndex > 0) {
        await cardController?.flip();
      }
    } else {
      await cardController?.flipUpToVertical();
      card.visibleFaceIndex = 0;
    }

    if (targetDeck != null) {  
      const [getDeck, setDeck] = targetDeck;
      const deck = getDeck();
      const deckLength = deck.length;
      const index = endOfDeck
          ? deckLength
          : card.recyclePosition 
              ? Math.min(deckLength - card.recyclePosition - 1, deckLength)
              : Math.floor(Math.random() * deckLength);
      setDeck([...deck.slice(0, index), card, ...deck.slice(index)]);
    }
    if (cardSlot.targetCard === card) {
      cardSlot.targetCard = undefined;
    } else {
      cardSlot.playedCards = cardSlot.playedCards.filter(c => c !== card);
    }

    if (animateReturnToDeck) {
      // TODO factor in other decks
      const deckPosition = this.tableController.getPlayerDeckTablePosition();
      const playerSlotIndex = this.game.playerHand.indexOf(cardSlot);
      const bookSlotIndex = this.game.book.cardSlots.indexOf(cardSlot);
      // TODO factor in whether it's a played or target card
      const cardPosition = playerSlotIndex >= 0
          ? this.tableController.getPlayerCardSlotTablePosition(playerSlotIndex)
          : this.tableController.getBookCardSlotTablePosition(bookSlotIndex);
      await cardController?.moveFrom(
          ...(cardPosition
              .map((v, i) =>  v - deckPosition[i])
              .map(v => `${v}vmin`) as [string, string, string]),
          Easing.Gentle,
          playerSlotIndex < 0 ? 'rotateX(-90deg)' : undefined
      );
    }
  }

  private async playerDeath(): Promise<void> {
    // die
    await this.navigation({
      type: NavigationTargetType.Death,
    })
    // clean up 
    this.game.playerCharacter = undefined;
    allCardSlots(this.game).forEach(c => {
      c.targetCard = undefined;
      c.playedCards = [];
    });
  }
}


