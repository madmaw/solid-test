import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createCardSlotManager, createCardSlots } from "components/card_slot/create";
import { createCardManager } from "components/card/create";
import { createPageManager } from "components/page/create";
import { PageSide } from "components/page/page_controller";
import { BookSpreadType, bookSpreadRoomDescriptor, bookSpreadTableOfContentsDescriptor } from "model/domain";
import { cardMight, cardNextRoom, initialGame } from "data/initial";
import { createSpread } from "components/spread/create";
import { InteractionManager } from "rules/interaction_manager";
import { createDragOverlay } from "components/drag/create";

window.onload = function () {
  const app = document.getElementById('app')!;
  const game = initialGame;
  const interactionManger = new InteractionManager();
  window.addEventListener('mousemove', e => {
    interactionManger.lastMousePosition = [e.clientX, e.clientY];
  });

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable(interactionManger);

  const onNavigate = (to: BookSpreadType) => {
    const spread = bookSpreadRoomDescriptor.create({
      type: BookSpreadType.Room,
      cardSlots: [
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
    spread.cardSlots[0].targetCard = cardNextRoom;
    bookController.showSpread(spread);
  };

  const leftPageManager = createPageManager({
    side: PageSide.Left,
    onNavigate,
  });
  const rightPageManager = createPageManager({
    side: PageSide.Right,
    onNavigate,
  });


  const cardManager = createCardManager();
  const cardSlotManager = createCardSlotManager(
    cardManager.FactoryComponent,
    interactionManger,
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

  const onClickCover = async () => {
    await tableController.setView(View.Tilted);
    // bookController.showSpread(bookSpreadTableOfContentsDescriptor.create({
    //   type: BookSpreadType.TableOfContents,
    // }));
    onNavigate(BookSpreadType.Room);
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


  const Deck = () => <div/>;

  function Book() {
    return <BookImpl onClickCover={onClickCover} />;
  }

  render(() => (
      <TableComponent
          Book={Book}
          Hand={Hand}
          Deck={Deck}
          SpreadOverlay={SpreadOverlay}
          DragOverlay={DragOverlay}
      />
  ), app);

  // setInterval(() => {
  //   cardManager.lookupController(cardMight)?.flip();
  // }, 5000);

};
