import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createCardSlotManager, createCardSlots } from "components/card_slot/create";
import { createCardManager } from "components/card/create";
import { createPageManager } from "components/page/create";
import { PageSide } from "components/page/page_controller";
import { initialGame } from "data/initial";
import { createSpreadOverlay } from "components/spread/overlay/create";
import { InteractionManager } from "rules/interaction_manager";
import { createDragOverlay } from "components/drag/create";
import { GameManager } from "rules/game_manager";
import { createDeck } from "components/deck/create";
import { createStatusOverlay } from "components/status/create";
import { createEncounter } from "components/encounter/create";
import { createEncounterBattleManger } from "components/encounter/battle/create";
import { gameEncounterBattle } from "rules/games";
import { createMemo } from "solid-js";

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
    Component: SpreadOverlayComponent,
  } = createSpreadOverlay({
    CardSlotsComponent,
  });

  const StatusOverlayComponent = createStatusOverlay()

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
    gameManager.nextPage(undefined);
  };


  const {
    Component: PlayerDeck,
  } = createDeck(() => game.playerCharacter?.deck, cardManager.FactoryComponent);

  const onClickCover = async () => {
    await tableController.setView(View.Tilted);
    // bookController.showSpread(bookSpreadTableOfContentsDescriptor.create({
    //   type: BookSpreadType.TableOfContents,
    // }));
    gameManager.createPlayer();
    onNavigate();
  };

  function Hand() {
    return <CardSlotsComponent model={game.playerHand}/>;
  }

  function SpreadOverlay() {
    // <>{}</> is needed to re-render on game.book.spread changing
    return (
      <>
        {
          game.book.spread && <SpreadOverlayComponent model={game.book.spread}/>
        }
      </>
    );
  }

  const { Component: DragOverlay } = createDragOverlay(
    interactionManger,
    cardManager.FactoryComponent,
  );

  const encounterBattleComponentManager = createEncounterBattleManger();

  function Book() {
    const battle = createMemo(() => gameEncounterBattle(game));
    return (
      <BookImpl onClickCover={onClickCover}>
        {battle() && <encounterBattleComponentManager.FactoryComponent
            model={battle()!}/>}
      </BookImpl>
    );
  }

  function StatusOverlay() {
    // <>{}</> is needed to re-render on game.playerCharacter.spread changing
    return (
      <>
        {
          game.playerCharacter
              && <StatusOverlayComponent playerCharacter={game.playerCharacter}/>
        }
      </>
    );
  }

  render(() => (
      <TableComponent
          Book={Book}
          Hand={Hand}
          Deck={PlayerDeck}
          SpreadOverlay={SpreadOverlay}
          StatusOverlay={StatusOverlay}
          DragOverlay={DragOverlay}
      />
  ), app);
};
