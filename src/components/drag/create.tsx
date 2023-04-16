import { InteractionManager } from "rules/interaction_manager";
import { DragOverlay } from "./drag_overlay";
import { DragOverlayController } from "./drag_overlay_controller";
import { Component } from "solid-js";
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

  function Component() {
    return (
      <>
        {
          interactionManager.lastMousePosition && (
            <DragOverlay
                cx={interactionManager.lastMousePosition[0]}
                cy={interactionManager.lastMousePosition[1]}
                Card={Card}
            />
          )
        }
      </>
    );
  }

  return {
    controller, 
    Component,
  };
}