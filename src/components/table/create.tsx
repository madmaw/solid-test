import { Component } from "solid-js";
import { TableComponent } from "./table";
import { Animations, TableController, View, tableUIDescriptor } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function createTable() {
  const tableUI = tableUIDescriptor.create({
    view: View.TopDownBookCentered,
  })
  const animations = new AnimationManager<Animations>(); 
  const controller = new TableController(tableUI, animations);

  function Component(props: {
    Book: Component,
    Overlay: Component,
    Hand: Component,
    Deck: Component,
  }) {
    return (
      <TableComponent
          Book={props.Book}
          Overlay={props.Overlay}
          Hand={props.Hand}
          Deck={props.Deck}
          view={tableUI.view} 
          animations={animations}
      />
    );
  }

  return {
    Component,
    controller,
  };
}