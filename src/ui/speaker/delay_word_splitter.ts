import { delay } from "base/delay";
import { WordSplitter, WordSplitterListener } from "./rendering_speaker";

export class DelayWordSplitter implements WordSplitter {
  async say(text: string, listener: WordSplitterListener) {
    const words = text.split(' ');
    let length = -1;
    for (const word of words) {
      let ticks = word.length;
      if (word.endsWith(',')) {
        ticks++;
      }
      if (word.endsWith('.')) {
        ticks+=3;
      }
      length += word.length + 1;
      listener(length);
      await delay(ticks * 100);
    }
  }
}