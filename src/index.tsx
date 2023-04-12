import { render } from "solid-js/web";
import { Book } from "components/book/book";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";

window.onload = function () {
  const app = document.getElementById('app')!;
  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable();
  render(() => <TableComponent Book={Book} />, app);
  setTimeout(() => {
    tableController.setView(View.TopDown);
  }, 1000);
  setTimeout(() => {
    tableController.setView(View.Tilted);
  }, 2000);
};
