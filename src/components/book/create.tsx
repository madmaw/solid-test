import { Book, BookSpread } from "model/domain";
import { BookComponent, PagePair } from "./book";
import { Animations, BookController, bookUIDescriptor } from "./book_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { ParentProps } from "solid-js";
import { ChrononomiconCoverComponent } from "./cover/chrononomicon";
import { PageComponentManager, PageSide } from "components/page/page_controller";

export function createBook({
  pageComponentManager,
  book,
}: {
  pageComponentManager: PageComponentManager,
  book: Book,
}) {
  function renderPagePair(spread: BookSpread | undefined): PagePair | undefined {
    if (spread == null) {
      return;
    }
    return [
      <pageComponentManager.FactoryComponent model={spread} side={PageSide.Left}/>,
      <pageComponentManager.FactoryComponent model={spread} side={PageSide.Right}/>
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
    pageComponentManager,
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

