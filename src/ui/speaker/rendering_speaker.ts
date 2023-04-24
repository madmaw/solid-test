import { Accessor, Setter, batch, createSignal } from "solid-js";
import { Speaker } from "./speaker";
import { delay } from "base/delay";

export interface WordSplitterListener {
  (characterIndex: number): void;
}

export interface WordSplitter {
  say(text: string, listener: WordSplitterListener): Promise<void>;
}

export class RenderingSpeaker implements Speaker {
  private previousPromise: Promise<void> = Promise.resolve();
  private characterIndexGetter: Accessor<number>;
  private characterIndexSetter: Setter<number>;
  private textGetter: Accessor<string | undefined>;
  private textSetter: Setter<string | undefined>;

  constructor(
    private readonly splitter: WordSplitter,
  ) {
    const [text, textSetter] = createSignal<string>();
    this.textGetter = text;
    this.textSetter = textSetter;
    const [characterIndex, characterIndexSetter] = createSignal<number>(0);
    this.characterIndexGetter = characterIndex;
    this.characterIndexSetter = characterIndexSetter;
  }

  say(text: string): Promise<void> {
    this.previousPromise = this.previousPromise.then(async () => {
      batch(() => {
        this.textSetter(text);
        this.characterIndexSetter(0);
      });
      await this.splitter.say(text, characterIndex => {
        this.characterIndexSetter(characterIndex);
      });
      await delay(200);
      this.characterIndexSetter(0);
      await delay(200);
    });
    return this.previousPromise;
  }

  get characterIndex() {
    return this.characterIndexGetter();
  }

  get text() {
    return this.textGetter();
  }

}