import { ChapterType, chapterDescriptor } from "model/domain";
import { cards, finalCard } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Prelude,
  deck: [
    ...cards,
  ],
  pagesRemaining: 2,
  finalCard: finalCard,
});