import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createCardSlotManager, createCardSlots } from "components/card_slot/create";
import { createCardManager } from "components/card/create";
import { createPageManager } from "components/page/create";
import { PageSide } from "components/page/page_controller";
import { initialGame } from "data/initial";
import { createSpread } from "components/spread/create";
import { InteractionManager } from "rules/interaction_manager";
import { createDragOverlay } from "components/drag/create";
import { GameManager } from "rules/game_manager";
import { createDeck } from "components/deck/create";

window.onload = function () {
  const app = document.getElementById('app')!;
  const game = initialGame;
  const cardManager = createCardManager(game);
  const leftPageManager = createPageManager({
    side: PageSide.Left,
  });
  const rightPageManager = createPageManager({
    side: PageSide.Right,
  });

  const cardSlotManager = createCardSlotManager(
    cardManager.FactoryComponent,
    () => interactionManger,
    game,
  );

  const {
    Component: CardSlotsComponent,
  } = createCardSlots(cardSlotManager.FactoryComponent);

  const {
    Component: SpreadComponent,
  } = createSpread({
    CardSlotsComponent,
  });

  const {
    Component: BookImpl,
    controller: bookController,
  } = createBook({
    leftPageComponentManager: leftPageManager,
    rightPageComponentManager: rightPageManager,
    book: game.book,
  });

  const gameManager = new GameManager(game, cardManager, bookController);
  const interactionManger = new InteractionManager(gameManager, cardManager, cardSlotManager);
  
  window.addEventListener('pointermove', e => {
    interactionManger.lastMousePosition = [e.clientX, e.clientY];
  });

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable(interactionManger);

  const onNavigate = async () => {
    gameManager.nextPage();
  };


  const {
    Component: PlayerDeck,
  } = createDeck(() => game.playerDeck, cardManager.FactoryComponent);

  const onClickCover = async () => {
    await tableController.setView(View.Tilted);
    // bookController.showSpread(bookSpreadTableOfContentsDescriptor.create({
    //   type: BookSpreadType.TableOfContents,
    // }));
    onNavigate();
    console.log('show main menu');
  };

  function Hand() {
    return <CardSlotsComponent model={game.cardSlots}/>;
  }

  function SpreadOverlay() {
    // <>{}</> is needed to re-render on game.book.spread changing
    return (
      <>
        {
          game.book.spread && <SpreadComponent model={game.book.spread}/>
        }
      </>
    );
  }

  const { Component: DragOverlay } = createDragOverlay(
    interactionManger,
    cardManager.FactoryComponent,
  );


  function Book() {
    return <BookImpl onClickCover={onClickCover} />;
  }

  render(() => (
      <TableComponent
          Book={Book}
          Hand={Hand}
          Deck={PlayerDeck}
          SpreadOverlay={SpreadOverlay}
          DragOverlay={DragOverlay}
      />
  ), app);
};
