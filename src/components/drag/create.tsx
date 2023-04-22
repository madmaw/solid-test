import { InteractionManager } from "rules/interaction_manager";
import { DragOverlay } from "./drag_overlay";
import { DragOverlayController } from "./drag_overlay_controller";
import { Component, ParentProps } from "solid-js";
import { Card } from "model/domain";

export function createDragOverlay(
  interactionManager: InteractionManager,
  CardComponent: Component<{ model: Card }>,
) {
  const controller = new DragOverlayController();
  function Card() {
    return (
      <>
        {
          interactionManager.draggedCard
              && <CardComponent model={interactionManager.draggedCard}/>            
        }
      </>
    );
  }
  function onDragCancel() {
    interactionManager.clearDrag();
  }

  function Component(props: ParentProps) {
    return (
        <DragOverlay
            cx={interactionManager.lastMousePosition?.[0]}
            cy={interactionManager.lastMousePosition?.[1]}
            Card={Card}
            dragging={interactionManager.dragging}
            onDragCancel={onDragCancel}
        >
          {props.children}
        </DragOverlay>
    );
  }

  return {
    controller, 
    Component,
  };
}