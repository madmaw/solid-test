import { ChapterType, chapterDescriptor } from "model/domain";
import { cards } from "./cards";

export const chapter = chapterDescriptor.freeze({
  type: ChapterType.Forest,
  deck: [
    ...cards,
    ...cards,
  ],
});