import { ChapterType, chapterDescriptor } from "model/domain";
import { cards, finalCard } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Tutorial,
  deck: [
    ...cards,
  ],
  pagesRemaining: cards.length,
  finalCard,
});

