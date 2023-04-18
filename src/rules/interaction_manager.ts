import { UnreachableError } from "base/unreachable_error";
import { CardController } from "components/card/card_controller";
import { ComponentManager, ControllerManger } from "components/component_manager";
import { Card, CardFaceType, CardSlot } from "model/domain";
import { Accessor, Setter, batch, createSignal } from "solid-js";
import { cardFace } from "./cards";
import { GameManager } from "./game_manager";
import { CardSlotController } from "components/card_slot/card_slot_controller";
import { delay } from "base/delay";

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

export class InteractionManager {
  private readonly dragged: Accessor<DragState>;
  private readonly setDragged: Setter<DragState>;
  private readonly mousePosition: Accessor<MousePosition>;
  private readonly setMousePosition: Setter<MousePosition>;
  private readonly longPress: Accessor<LongPress>;
  private readonly setLongPress: Setter<LongPress>;
  private lastAnimation: Promise<void> = Promise.resolve();

  constructor(
      private gameManager: GameManager,
      private cardManager: ControllerManger<Card, CardController>,
      private cardSlotManager: ControllerManger<CardSlot, CardSlotController>,
  ) {
    const [dragged, setDragged] = createSignal<DragState>()
    this.dragged = dragged;
    this.setDragged = setDragged;
    const [mousePosition, setMousePosition] = createSignal<MousePosition>();
    this.mousePosition = mousePosition;
    this.setMousePosition = setMousePosition;
    const [longPress, setLongPress] = createSignal<LongPress>();
    this.longPress = longPress;
    this.setLongPress = setLongPress;
  }

  get dragging() {
    return this.dragged() != null;
  }

  get lastMousePosition() {
    return this.mousePosition();
  }

  set lastMousePosition(mousePosition: MousePosition) {
    this.setMousePosition(mousePosition);
  }

  get draggedCard() {
    return this.dragged()?.[0];
  }

  allowedInteraction(
    targetCardSlot: CardSlot | undefined,
  ): Interaction {
    const dragged = this.dragged();
    const targetCard = targetCardSlot?.targetCard;
    if (dragged != null) {
      const [_, draggedCardSlot] = dragged;
      if (targetCardSlot == draggedCardSlot) {
        return Interaction.Dragging;
      }
      if (targetCard != null) {
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
      if (cardSlot.targetCard != null) {
        return this.gameManager.chooseCard(cardSlot.targetCard);
      }  
    });
  }

  startDrag(cardSlot: CardSlot) {
    return this.politelyAnimate(async () => {
      const interaction = this.allowedInteraction(cardSlot);
      const targetCard = cardSlot.targetCard;
      if (targetCard != null) {
        if (interaction === Interaction.Drag) {
          batch(() => {
            this.cardSlotManager.lookupController(cardSlot)?.setTargetCardHidden(true);
            this.setDragged([targetCard, cardSlot]);
          });  
        } else if (interaction === Interaction.LongPress) {
          if (this.longPress() == null) {
            await this.cardManager.lookupController(targetCard)?.flipTemporarily(true);
            this.setLongPress(cardSlot);
          }
        }
      }  
    });
  }

  clearDrag() {
    return this.politelyAnimate(async () => {
      const dragged = this.dragged();
      if (dragged) {
        const [draggedCard, draggedCardSlot] = dragged;
        batch(() => {
          draggedCardSlot.targetCard = draggedCard;
          this.cardSlotManager.lookupController(draggedCardSlot)?.setTargetCardHidden(false);
          this.setDragged();
        });  
      }
      const longPress = this.longPress();
      if (longPress) {
        const cardSlot = longPress;
        this.setLongPress();
        if (cardSlot.targetCard) {
          await this.cardManager.lookupController(cardSlot.targetCard)?.flipTemporarily(false);
        }            
      }  
    });
  }

  drop(targetCardSlot: CardSlot) {
    return this.politelyAnimate(async () => {
      const dragged = this.dragged();
      if (dragged) {
        const [draggedCard, draggedCardSlot] = dragged;
        const interaction = this.allowedInteraction(targetCardSlot);
        if (draggedCardSlot != targetCardSlot && interaction == Interaction.Drop) {
          batch(() => {
            targetCardSlot.playedCards = [...targetCardSlot.playedCards, draggedCard];
            draggedCardSlot.targetCard = undefined;
            this.setDragged();
          });  
          this.gameManager.normalizeBoard();
        } else {
          batch(() =>{
            draggedCardSlot.targetCard = draggedCard;
            this.setDragged();
          });
        }
        this.cardSlotManager.lookupController(draggedCardSlot)?.setTargetCardHidden(false);
      }  
    });
  }

  private politelyAnimate(action: () => Promise<void>): Promise<void> {
    this.lastAnimation = this.lastAnimation
        // prevent errors from breaking this permanently
        .catch(e => console.log(e))
        .then(action)
        // add a delay to ensure a render happens between state changes
        .then(() => delay(0));
    return this.lastAnimation;
  }
}

