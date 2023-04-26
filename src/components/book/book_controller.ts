import { delay } from "base/delay";
import { PageComponentManager } from "components/page/page_controller";
import { booleanDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Book, BookSpread, bookSpreadDescriptor } from "model/domain";
import { batch } from "solid-js";
import { AnimationManager } from "ui/animation/animation_manager";
import { SoundEffect, SoundManager } from "ui/sounds/sound_manager";

export type Animations = 'open' | 'turn' | 'close' | 'midway';

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
    private pageComponentManager:  PageComponentManager,
    private soundManager: SoundManager,
  ) { }

  async showSpread(spread: BookSpread | undefined, turnLeftToRight: boolean = false) {
    if (spread != this.book.spread) {
      this.soundManager.playEffect(SoundEffect.BookFlip);
      const opening = this.book.spread == null;
      const previousSpread = this.book.spread;
      if (previousSpread != null) {
        await this.pageComponentManager.lookupController(previousSpread)?.popdown();
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
          await this.pageComponentManager.lookupController(spread)?.popup();
        }
      });
    }
  }
}
