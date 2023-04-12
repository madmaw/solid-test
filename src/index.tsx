import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { batch } from "solid-js";
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
    Component: MainMenuImpl,
  } = createMainMenu();

  // TODO: a lot of the following code should probably live inside a game controller or something
  const testPages: PagePair = {
    Left: TestPage,
    Right: TestPage,
  }
  const startGame = () => {
    console.log('start game');
    bookController.showPages(testPages)
  }
  const MainMenu = () => <MainMenuImpl startGame={startGame} />

  const mainMenuPages: PagePair = {
    Left: MainMenu,
    Right: TestPage,
  }
  const onClickCover = async () => {
    await tableController.setView(View.TopDown);
    batch(() => {
      bookController.showPages(mainMenuPages);
      tableController.setView(View.Tilted);
    });

    console.log('show main menu');
  }

  const Book = () =>
    <BookImpl onClickCover={onClickCover} />

  render(() => <TableComponent Book={Book} />, app);

};
