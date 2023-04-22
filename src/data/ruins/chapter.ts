import { ChapterType, chapterDescriptor } from "model/domain";
import { cards } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Ruins,
  deck: [
    ...cards,
    ...cards,
  ],
});