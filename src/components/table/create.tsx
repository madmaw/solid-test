import { Component } from "solid-js";
import { TableComponent } from "./table";
import { Animations, TableController, View, tableDescriptor } from "./table_controller";
import { AnimationManager } from "base/animation_manager";

export function createTable() {
  const table = tableDescriptor.create({
    view: View.TopDownBookCentered,
  })
  const animations = new AnimationManager<Animations>(); 
  const controller = new TableController(table, animations);

  function Component(props: { Book: Component }) {
    return (
      <TableComponent
          Book={props.Book}
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