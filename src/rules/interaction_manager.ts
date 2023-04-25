import { UnreachableError } from "base/unreachable_error";
import { CardController } from "components/card/card_controller";
import { ControllerManger } from "components/component_manager";
import { Card, CardFaceType, CardSlot, Game } from "model/domain";
import { batch } from "solid-js";
import { cardFace } from "./cards";
import { GameManager } from "./game_manager";
import { CardSlotController } from "components/card_slot/card_slot_controller";
import { delay } from "base/delay";
import { activeRecordDescriptor } from "model/descriptor/record";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";

export const enum Interaction {
  None = 1,
  Activate,
  Drag,
  Dragging,
  Drop,
  NoDrop,
  LongPress,
  Disabled,
}

type DragState = [Card, CardSlot] | undefined;
type MousePosition = [number, number] | undefined;
type LongPress = CardSlot | undefined;

const interactionUI = activeRecordDescriptor({
  dragging: booleanDescriptor,
  dragged: new LiteralTypeDescriptor<DragState>(),
  mousePosition: new LiteralTypeDescriptor<MousePosition>(),
  longPress: new LiteralTypeDescriptor<LongPress>(),
});

type InteractionUI = typeof interactionUI.aMutable;

export class InteractionManager {
  private ui: InteractionUI = interactionUI.create({
    dragged: undefined,
    dragging: false,
    longPress: undefined,
    mousePosition: undefined,
  });
  private lastAnimation: Promise<void> = Promise.resolve();

  constructor(
      private game: Game,
      private gameManager: GameManager,
      private cardManager: ControllerManger<Card, CardController>,
      private cardSlotManager: ControllerManger<CardSlot, CardSlotController>,
  ) {
  }

  get dragging() {
    return this.ui.dragging;
  }

  set dragging(dragging: boolean) {
    this.ui.dragging = dragging;
  }

  get lastMousePosition() {
    return this.ui.mousePosition;
  }

  set lastMousePosition(mousePosition: MousePosition) {
    this.ui.mousePosition = mousePosition;
  }

  get draggedCard() {
    return this.ui.dragged?.[0];
  }

  allowedInteraction(
    targetCardSlot: CardSlot | undefined,
  ): Interaction {
    const dragged = this.ui.dragged;
    const targetCard = targetCardSlot?.targetCard;
    if (dragged != null && targetCardSlot != null) {
      const [_, draggedCardSlot] = dragged;
      if (targetCardSlot == draggedCardSlot) {
        return Interaction.Dragging;
      }
      if (targetCard != null && targetCardSlot.playedCards.length < 3) {
        // can drop 
        return Interaction.Drop;
      }
      return Interaction.NoDrop;
    }
    if (targetCard == null) {
      return Interaction.None;
    }

    const targetFace = cardFace(
      targetCard,
      !!this.cardManager.lookupController(targetCard)?.isPeeking()
    );

    if (this.game.book.cardSlots.indexOf(targetCardSlot!) >= 0 ) {
      return Interaction.Activate;
    }
    
    switch (targetFace.type) {
      case CardFaceType.Choice:
        return Interaction.Activate;
      case CardFaceType.ChoiceBack:
        return Interaction.Activate;
      case CardFaceType.Resource:
        return Interaction.Drag;
      case CardFaceType.ResourceBack:
        return Interaction.LongPress;
      default:
        throw new UnreachableError(targetFace);
    }
  }

  click(cardSlot: CardSlot) {
    return this.politelyAnimate(async () => {
      return this.gameManager.chooseTargetCard(cardSlot);
    });
  }

  startDrag(cardSlot: CardSlot, x: number, y: number) {
    return this.politelyAnimate(async () => {
      const interaction = this.allowedInteraction(cardSlot);
      const targetCard = cardSlot.targetCard;
      if (targetCard != null) {
        const cardController = this.cardManager.lookupController(targetCard);
        if (interaction === Interaction.Drag) {
          batch(() => {
            this.cardSlotManager.lookupController(cardSlot)?.setTargetCardHidden(true);
            this.ui.dragged = [targetCard, cardSlot];
            this.ui.mousePosition = [x, y];
            this.ui.dragging = true;
            cardController?.setWarning(true);
          });  
        } else if (interaction === Interaction.LongPress) {
          if (this.ui.longPress == null) {
            await cardController?.flipTemporarily(true);
            this.ui.longPress = cardSlot;
          }
        }
      }  
    });
  }

  clearDrag() {
    this.ui.dragging = false;
    return this.politelyAnimate(async () => {
      const dragged = this.ui.dragged;
      if (dragged) {
        const [draggedCard, draggedCardSlot] = dragged;
        batch(() => {
          draggedCardSlot.targetCard = draggedCard;
          this.cardSlotManager.lookupController(draggedCardSlot)?.setTargetCardHidden(false);
          this.cardManager.lookupController(draggedCard)?.setWarning(false);
          this.ui.dragged = undefined;
        });  
      }
      const longPress = this.ui.longPress;
      if (longPress) {
        const cardSlot = longPress;
        this.ui.longPress = undefined;
        if (cardSlot.targetCard) {
          const cardController = this.cardManager.lookupController(cardSlot.targetCard);
          await cardController?.flipTemporarily(false);
        }            
      }  
    });
  }

  drop(targetCardSlot: CardSlot) {
    return this.politelyAnimate(async () => {
      const dragged = this.ui.dragged;
      if (dragged) {
        const [draggedCard, draggedCardSlot] = dragged;
        const interaction = this.allowedInteraction(targetCardSlot);
        if (draggedCardSlot != targetCardSlot && interaction == Interaction.Drop) {
          // apply effects of dragged card
          await this.gameManager.applyCardEffects(draggedCardSlot);

          batch(() => {
            targetCardSlot.playedCards = [...targetCardSlot.playedCards, draggedCard];
            draggedCardSlot.targetCard = undefined;
            this.ui.dragged = undefined;
          });

          await this.gameManager.normalizeBoard();
        } else {
          batch(() =>{
            draggedCardSlot.targetCard = draggedCard;
            this.ui.dragged = undefined;
          });
        }
        this.cardSlotManager.lookupController(draggedCardSlot)?.setTargetCardHidden(false);
        this.cardManager.lookupController(draggedCard)?.setWarning(false);
      }
    });
  }

  private politelyAnimate(action: () => Promise<void>): Promise<void> {
    this.lastAnimation = this.lastAnimation
        // prevent errors from breaking this permanently
        .catch(e => console.warn(e))
        .then(action)
        // add a delay to ensure a render happens between state changes
        .then(() => delay(0));
    return this.lastAnimation;
  }
}

