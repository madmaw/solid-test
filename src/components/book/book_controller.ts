import { delay } from "base/delay";
import { ComponentManager } from "components/component_manager";
import { PageController } from "components/page/page_controller";
import { booleanDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Book, BookSpread, bookSpreadDescriptor } from "model/domain";
import { batch } from "solid-js";
import { AnimationManager } from "ui/animation/animation_manager";

export type Animations = 'open' | 'turn' | 'close' | 'midway';

export type PageComponentManager = ComponentManager<BookSpread, PageController>;

export const bookUIDescriptor = activeRecordDescriptor({
  previousSpread: optionalDescriptor(bookSpreadDescriptor),
  turnLeftToRight: booleanDescriptor,
  turnPastMidway: booleanDescriptor,
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
      const opening = this.book.spread == null;
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
        this.bookUI.turnPastMidway = false;
        this.book.spread = spread;
      });
      if (opening) {
        await this.animations.waitForAnimation('open');
      } else {
        await this.animations.waitForAnimation('midway');
        this.bookUI.turnPastMidway = true;
        await this.animations.waitForAnimation('turn');
        this.bookUI.previousSpread = undefined;
      }
      // ensure everything is mounted before popping up
      await delay(0);
      await batch(async () => {
        if (spread != null) {
          await Promise.all(
            this.pageComponentManagers.map(m => m.lookupController(spread)?.popUp())
          );
        }
      });
    }
  }
}
