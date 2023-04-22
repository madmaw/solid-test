import { Component } from "solid-js";
import { TableComponent } from "./table";
import { Animations, TableController, View, tableUIDescriptor } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function createTable() {
  const tableUI = tableUIDescriptor.create({
    view: View.TopDownBookCentered,
    lookDx: 0,
    lookDy: 0,
  });
  const animations = new AnimationManager<Animations>(); 
  const controller = new TableController(tableUI, animations);

  function Component(props: {
    Book: Component,
    Hand: Component,
    Deck: Component,
    SpreadOverlay: Component,
    StatusOverlay: Component,
  }) {
    return (
      <TableComponent
          Book={props.Book}
          Hand={props.Hand}
          Deck={props.Deck}
          SpreadOverlay={props.SpreadOverlay}
          StatusOverlay={props.StatusOverlay}
          view={tableUI.view}
          lookDx={tableUI.lookDx}
          lookDy={tableUI.lookDy}
          animations={animations}
      />
    );
  }

  return {
    Component,
    controller,
  };
}