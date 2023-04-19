import { ComponentManager } from "components/component_manager";
import { PageController } from "components/page/page_controller";
import { booleanDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Book, BookSpread, bookSpreadDescriptor } from "model/domain";
import { batch } from "solid-js";
import { AnimationManager } from "ui/animation/animation_manager";

export type Animations = 'turn';

export type PageComponentManager = ComponentManager<BookSpread, PageController>;

export const bookUIDescriptor = activeRecordDescriptor({
  previousSpread: optionalDescriptor(bookSpreadDescriptor),
  turnLeftToRight: booleanDescriptor,
});

export type BookUI = typeof bookUIDescriptor.aMutable;
export type BookUIState = typeof bookUIDescriptor.aState;

export class BookController {
  constructor(
    private readonly book: Book,
    private readonly bookUI: BookUI,
    private animations: AnimationManager<Animations>,
    private pageComponentManagers: readonly PageComponentManager[],
  ) { }

  async showSpread(spread: BookSpread | undefined, turnLeftToRight: boolean = false) {
    if (spread != this.book.spread) {
      const previousSpread = this.book.spread;
      if (previousSpread != null) {
        await Promise.all(
          this.pageComponentManagers.map(
            m => m.lookupController(previousSpread)?.popDown()
          )
        );
      }
      batch(() => {
        this.bookUI.previousSpread = this.book.spread;
        this.bookUI.turnLeftToRight = turnLeftToRight;
        this.book.spread = spread;
      });
      await this.animations.waitForAnimation('turn');
      if (spread != null) {
        await Promise.all(
          this.pageComponentManagers.map(m => m.lookupController(spread)?.popUp())
        );
      }
    }
  }
}
