import { UnreachableError } from "base/unreachable_error";
import { CardController } from "components/card/card_controller";
import { ComponentManager } from "components/component_manager";
import { Card, CardFaceType, CardSlot } from "model/domain";
import { Accessor, Setter, batch, createSignal } from "solid-js";
import { cardFace } from "./card";
import { GameManager } from "./game_manager";

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
type LongPress = [CardSlot, Promise<void>] | undefined;

export class InteractionManager {
  private readonly dragged: Accessor<DragState>;
  private readonly setDragged: Setter<DragState>;
  private readonly mousePosition: Accessor<MousePosition>;
  private readonly setMousePosition: Setter<MousePosition>;
  private readonly longPress: Accessor<LongPress>;
  private readonly setLongPress: Setter<LongPress>;

  constructor(
      private gameManager: GameManager,
      private cardManager: ComponentManager<Card, CardController>,
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

    const targetFace = cardFace(targetCard);
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

  startDrag(cardSlot: CardSlot) {
    const interaction = this.allowedInteraction(cardSlot);
    const targetCard = cardSlot.targetCard;
    if (targetCard != null) {
      if (interaction === Interaction.Drag) {
        batch(() => {
          cardSlot.targetCard = undefined;
          this.setDragged([targetCard, cardSlot]);
        });  
      } else if (interaction === Interaction.LongPress) {
        if (this.longPress() == null) {
          const promise = this.cardManager.lookupController(targetCard)?.flipTemporarily(true);
          if (promise) {
            this.setLongPress([cardSlot, promise]);
          }  
        }
      }
    }
  }

  clearDrag() {
    const dragged = this.dragged();
    if (dragged) {
      const [draggedCard, draggedCardSlot] = dragged;
      batch(() => {
        draggedCardSlot.targetCard = draggedCard;
        this.setDragged();
      });  
    }
    const longPress = this.longPress();
    if (longPress) {
      const [cardSlot, promise] = longPress;
      promise.finally(() => {
        this.setLongPress();
        return cardSlot.targetCard
            && this.cardManager.lookupController(cardSlot.targetCard)?.flipTemporarily(false);
      });
    }
  }

  drop(targetCardSlot: CardSlot) {
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
    }
  }
}

