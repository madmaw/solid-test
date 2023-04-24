import { ChapterType, chapterDescriptor } from "model/domain";
import { cards, finalCard } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Ruins,
  deck: [
    ...cards,
  ],
  finalCard,
  pagesRemaining: 10,
});