import { render } from "solid-js/web";
import { createTable } from "components/table/create";
import { View } from "components/table/table_controller";
import { createBook } from "components/book/create";
import { createCardSlotManager, createCardSlots } from "components/card_slot/create";
import { createCardManager } from "components/card/create";
import { createPageManager } from "components/page/create";
import { initialGame } from "data/initial";
import { InteractionManager } from "rules/interaction_manager";
import { createDragOverlay } from "components/drag/create";
import { GameManager } from "rules/game_manager";
import { createDeck } from "components/deck/create";
import { createStatusOverlay } from "components/status/create";
import { createEncounterBattleManger } from "components/encounter/battle/create";
import { gameEncounterBattle, gameEncounterEvent } from "rules/games";
import { createMemo } from "solid-js";
import { BookSpreadType, bookSpreadDeathDescriptor, bookSpreadTableOfContentsDescriptor } from "model/domain";
import { NavigationTarget, NavigationTargetType } from "components/navigation_target";
import { UnreachableError } from "base/unreachable_error";
import { createEncounterEventManger } from "components/encounter/event/create";
import { createEncounter } from "components/encounter/create";
import { RenderingSpeaker } from "ui/speaker/rendering_speaker";
import { SpeechSynthesisWordSplitter } from "ui/speaker/speech_synthesis_word_splitter";
import { DelayWordSplitter } from "ui/speaker/delay_word_splitter";
import { PoliteSpeaker } from "ui/speaker/polite_speaker";

window.onload = function () {

  const wordSplitter = new SpeechSynthesisWordSplitter(
      window.speechSynthesis,
      new DelayWordSplitter(),
  );
  const renderingSpeaker = new RenderingSpeaker(wordSplitter);
  const speaker = new PoliteSpeaker(renderingSpeaker);

  const app = document.getElementById('app')!;
  const game = initialGame;
  const cardManager = createCardManager(game);

  const navigation = async (to: NavigationTarget): Promise<void> => {
    switch (to.type) {
      case NavigationTargetType.ToC:
        await tableController.setView(View.TopDown);
        return bookController.showSpread(bookSpreadTableOfContentsDescriptor.create({
          type: BookSpreadType.TableOfContents,
          unlockedChapters: 0,
        }), true);
      case NavigationTargetType.Chapter:
        await tableController.setView(View.Tilted);
        gameManager.maybeCreatePlayer();
        gameManager.createChapter(to.chapterIndex);
        return gameManager.nextPage(undefined, undefined);
      case NavigationTargetType.Death:
        await bookController.showSpread(bookSpreadDeathDescriptor.create({
          type: BookSpreadType.Death,
        }));
        return tableController.setView(View.TopDown);
      default:
        throw new UnreachableError(to);
    }
  };


  const pageComponentManager = createPageManager(
    navigation,
  );

  const cardSlotManager = createCardSlotManager(
    cardManager.FactoryComponent,
    () => interactionManger,
    game,
  );

  const {
    Component: CardSlotsComponent,
  } = createCardSlots(cardSlotManager.FactoryComponent);

  const StatusOverlayComponent = createStatusOverlay()

  const {
    Component: BookImpl,
    controller: bookController,
  } = createBook({
    pageComponentManager,
    book: game.book,
  });

  const {
    Component: TableComponent,
    controller: tableController,
  } = createTable();

  const encounterBattleManager = createEncounterBattleManger();
  const encounterEventManager = createEncounterEventManger();
  const Encounter = createEncounter(encounterBattleManager, encounterEventManager);
  const gameManager = new GameManager(
      speaker,
      game,
      navigation,
      tableController,
      bookController,
      cardManager,
      cardSlotManager,
      encounterBattleManager,
      encounterEventManager,
  );
  const interactionManger = new InteractionManager(
      gameManager,
      cardManager,
      cardSlotManager,
  );
  
  window.addEventListener('pointermove', e => {
    if (interactionManger.dragging) {
      interactionManger.lastMousePosition = [e.clientX, e.clientY];
    }
  });
  window.addEventListener('mousemove', e => {
    const dx = (e.clientX - window.innerWidth/2)*2/window.innerWidth;
    const dy = (e.clientY - window.innerHeight/2)*2/window.innerHeight;
    tableController.look(Math.pow(dx, 3)/2, Math.pow(dy, 3)/2);
  });

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
          game.book.spread && <CardSlotsComponent model={game.book.cardSlots}/>
        }
      </>
    );
  }

  const { Component: DragOverlay } = createDragOverlay(
    interactionManger,
    cardManager.FactoryComponent,
  );

  function Book() {
    const encounter = createMemo(() => gameEncounterBattle(game) || gameEncounterEvent(game));
    return (
      <BookImpl>
        {encounter() && <Encounter model={encounter()!}/>}
      </BookImpl>
    );
  }

  function StatusOverlay() {
    // <>{}</> is needed to re-render on game.playerCharacter.spread changing
    return (
      <>
        {
          game.playerCharacter
              && <StatusOverlayComponent
                      playerCharacter={game.playerCharacter}
                      speaker={renderingSpeaker}/>
        }
      </>
    );
  }

  render(() => (
      <DragOverlay>
        <TableComponent
            Book={Book}
            Hand={Hand}
            Deck={PlayerDeck}
            SpreadOverlay={SpreadOverlay}
            StatusOverlay={StatusOverlay}
        />
      </DragOverlay>
  ), app);

  // TODO load assets
  setTimeout(async () => {
    navigation({
      type: NavigationTargetType.ToC,
    });
  }, 2000);
};
