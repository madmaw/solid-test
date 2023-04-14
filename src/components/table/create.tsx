import { Component } from "solid-js";
import { TableComponent } from "./table";
import { Animations, TableController, View, tableDescriptor } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function createTable() {
  const table = tableDescriptor.create({
    view: View.TopDownBookCentered,
  })
  const animations = new AnimationManager<Animations>(); 
  const controller = new TableController(table, animations);

  function Component(props: {
    Book: Component,
    Hand: Component,
    Deck: Component,
  }) {
    return (
      <TableComponent
          Book={props.Book}
          Hand={props.Hand}
          Deck={props.Deck}
          view={table.view} 
          animations={animations}
      />
    );
  }

  return {
    Component,
    controller,
  };
}