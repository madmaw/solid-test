import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createMainMenu } from "components/main_menu/create";
import { PagePair } from "components/book/book_controller";
import { TestPage } from "components/test_page/test_page";
import { createCardSlotManager, createCardSlots } from "components/card_slot/create";
import { cardDescriptor, gameDescriptor } from "model/domain";
import { cardTypeKick } from "data/cards/kick";
import { cardTypeMight } from "data/cards/might";
import { createCardManager } from "components/card/create";

window.onload = function () {
  const app = document.getElementById('app')!;

  const cardKick = cardDescriptor.create({
    type: cardTypeKick,
    visibleFaceIndex: 0,
  });
  const cardMight = cardDescriptor.create({
    type: cardTypeMight,
    visibleFaceIndex: 0,
  });
  
  const game = gameDescriptor.create({
    cardSlots: [
      {
        targetCard: cardDescriptor.snapshot(cardMight),
        playedCards: [],
      },
      {
        targetCard: undefined,
        playedCards: [],
      },
      {
        targetCard: undefined,
        playedCards: [],
      },
      {
        targetCard: undefined,
        playedCards: [],
      },
      {
        targetCard: undefined,
        playedCards: [],
      },
    ],
  });
  game.cardSlots[0].targetCard = cardKick;
  game.cardSlots[1].targetCard = cardMight;

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable();

  const {
    Component: BookImpl,
    controller: bookController,
  } = createBook();

  const cardManager = createCardManager();
  const cardSlotManager = createCardSlotManager(cardManager.FactoryComponent);

  const {
    Component: MainMenuImpl,
  } = createMainMenu();
  const {
    Component: CardSlots,
  } = createCardSlots(cardSlotManager.FactoryComponent);

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
    await tableController.setView(View.Tilted);
    bookController.showPages(mainMenuPages);
    console.log('show main menu');
  }

  function Hand() {
    return <CardSlots cardSlots={game.cardSlots}/>;
  }
  const Deck = () => <div/>;

  function Book() {
    return <BookImpl onClickCover={onClickCover} />;
  }

  render(() => <TableComponent Book={Book} Hand={Hand} Deck={Deck}/>, app);

  setInterval(() => {
    cardManager.lookupController(cardMight)?.flip();
  }, 5000);

};
