import { Book, BookSpread } from "model/domain";
import { BookComponent, PagePair } from "./book";
import { Animations, BookController, PageComponentManager, bookUIDescriptor } from "./book_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { ParentProps } from "solid-js";
import { ChrononomiconCoverComponent } from "./cover/chrononomicon";

export function createBook({
  leftPageComponentManager,
  rightPageComponentManager,
  book,
}: {
  leftPageComponentManager: PageComponentManager,
  rightPageComponentManager: PageComponentManager,
  book: Book,
}) {
  function renderPagePair(spread: BookSpread | undefined): PagePair | undefined {
    if (spread == null) {
      return;
    }
    return [
      <leftPageComponentManager.FactoryComponent model={spread}/>,
      <rightPageComponentManager.FactoryComponent model={spread}/>
    ];
  }
  
  const animations = new AnimationManager<Animations>();
  const bookUI = bookUIDescriptor.create({
    previousSpread: undefined,
    turnLeftToRight: true,
    turnPastMidway: false,
  });
  const controller = new BookController(
    book,
    bookUI,
    animations,
    [leftPageComponentManager, rightPageComponentManager],
  );

  const Component = (props: ParentProps) => {
    return (
      <BookComponent
          animations={animations}
          previousPages={renderPagePair(bookUI.previousSpread)}
          currentPages={renderPagePair(book.spread)}
          turnLeftToRight={bookUI.turnLeftToRight}
          turnPastMidway={bookUI.turnPastMidway}
          Cover={ChrononomiconCoverComponent}>
        {props.children}
      </BookComponent>
    );
  };

  return {
    Component,
    controller,
  };
}

