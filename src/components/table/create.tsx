import { Component } from "solid-js";
import { TableComponent } from "./table";
import { TableController, View, tableDescriptor } from "./table_controller";

export function createTable() {
  const table = tableDescriptor.create({
    view: View.TopDownBookCentered,
  })
  const controller = new TableController(table);
  

  function Component(props: { Book: Component }) {
    return (
      <TableComponent
          Book={props.Book}
          view={table.view[0]()} 
          viewAnimationRef={controller.viewAnimationHandler.elementReference}
      />
    );
  }

  return {
    Component,
    controller,
  };
}