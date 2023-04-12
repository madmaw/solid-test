import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { batch } from "solid-js";

window.onload = function () {
  const app = document.getElementById('app')!;
  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable();
  const {
    Component: BookComponent,
    controller: bookController,
  } = createBook();
  const onRequestOpenBook = () => {
    tableController.viewAnimationHandler.setValue(View.TopDown).then(() => {
      batch(() => {
        bookController.setOpen(true)
        tableController.viewAnimationHandler.setValue(View.Tilted);  
      });
    });  
  };
  const Book = () => {
    return <BookComponent onRequestOpenBook={onRequestOpenBook}/>
  };
  render(() => <TableComponent Book={Book} />, app);
};
