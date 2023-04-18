import { Component } from "solid-js";
import { TableComponent } from "./table";
import { Animations, TableController, View, tableUIDescriptor } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { InteractionManager } from "rules/interaction_manager";

export function createTable(interactionManager: InteractionManager) {
  const tableUI = tableUIDescriptor.create({
    view: View.TopDownBookCentered,
  })
  const animations = new AnimationManager<Animations>(); 
  const controller = new TableController(tableUI, animations);
  function onDragCancel() {
    interactionManager.clearDrag();
  }

  function Component(props: {
    Book: Component,
    Hand: Component,
    Deck: Component,
    SpreadOverlay: Component,
    DragOverlay: Component,
    StatusOverlay: Component,
  }) {
    return (
      <TableComponent
          Book={props.Book}
          Hand={props.Hand}
          Deck={props.Deck}
          SpreadOverlay={props.SpreadOverlay}
          StatusOverlay={props.StatusOverlay}
          DragOverlay={props.DragOverlay}
          view={tableUI.view} 
          animations={animations}
          onDragCancel={onDragCancel}
          dragging={interactionManager.dragging}
      />
    );
  }

  return {
    Component,
    controller,
  };
}