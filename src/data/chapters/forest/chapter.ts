import { ChapterType, chapterDescriptor } from "model/domain";
import { cards, finalCard } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Forest,
  deck: [
    ...cards,
  ],
  pagesRemaining: 6,
  finalCard,
});