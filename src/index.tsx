import { render } from "solid-js/web";
import { Book } from "components/book/book";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createMainMenu } from "components/main_menu/create";
import { PagePair } from "components/book/book_controller";
import { TestPage } from "components/test_page/test_page";

window.onload = function () {
  const app = document.getElementById('app')!;

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable();

  const {
    Component: BookImpl,
    controller: bookController,
  } = createBook();

  const {
    Component: MainMenu,
  } = createMainMenu();

  // TODO: this should probably live inside a game controller or something
  const mainMenuPages: PagePair = {
    Left: MainMenu,
    Right: TestPage,
  }
  const onClickCover = () => {
    console.log('on click cover');
    bookController.showPages(mainMenuPages);
  }

  const Book = () =>
    <BookImpl onClickCover={onClickCover} />

  render(() => <TableComponent Book={Book} />, app);

  setTimeout(() => {
    tableController.setView(View.TopDown);
  }, 1000);
  setTimeout(() => {
    tableController.setView(View.Tilted);
  }, 2000);
};
