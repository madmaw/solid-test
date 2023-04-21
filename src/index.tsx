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
import { createEncounterBattleManger } from "components/encounter/battle/create";
import { gameEncounterBattle } from "rules/games";
import { createMemo } from "solid-js";
import { BookSpreadType, bookSpreadTableOfContentsDescriptor } from "model/domain";
import { NavigationTarget, NavigationTargetType } from "components/navigation_target";
import { UnreachableError } from "base/unreachable_error";

window.onload = function () {
  const app = document.getElementById('app')!;
  const game = initialGame;
  const cardManager = createCardManager(game);

  const navigation = async (to: NavigationTarget) => {
    switch (to.type) {
      case NavigationTargetType.Toc:
        await tableController.setView(View.TopDown);
        bookController.showSpread(bookSpreadTableOfContentsDescriptor.create({
          type: BookSpreadType.TableOfContents,
          unlockedChapters: 0,
        }));
        break;
      case NavigationTargetType.Chapter:
        await tableController.setView(View.Tilted);
        gameManager.createPlayer();
        return gameManager.nextPage(undefined);
      default:
        throw new UnreachableError(to);
    }
  };


  const leftPageManager = createPageManager({
    side: PageSide.Left,
    navigation,
  });
  const rightPageManager = createPageManager({
    side: PageSide.Right,
    navigation,
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
  const encounterBattleManager = createEncounterBattleManger();
  const gameManager = new GameManager(game, bookController, cardManager, encounterBattleManager);
  const interactionManger = new InteractionManager(gameManager, cardManager, cardSlotManager);
  
  window.addEventListener('pointermove', e => {
    interactionManger.lastMousePosition = [e.clientX, e.clientY];
  });

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable(interactionManger);

  const {
    Component: PlayerDeck,
  } = createDeck(() => game.playerCharacter?.deck, cardManager.FactoryComponent);

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

  function Book() {
    const battle = createMemo(() => gameEncounterBattle(game));
    return (
      <BookImpl>
        {battle() && <encounterBattleManager.FactoryComponent
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

  // TODO load assets
  setTimeout(async () => {
    navigation({
      type: NavigationTargetType.Toc,
    });
  }, 2000);
};
