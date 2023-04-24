import { Speaker } from "./speaker";

export class PoliteSpeaker implements Speaker {
  private lastSpoke = new Map<string, number>();

  constructor(private readonly speaker: Speaker) {

  }

  async say(text: string): Promise<void> {
    const lastSpoke = this.lastSpoke.get(text);
    const now = Date.now();
    if (lastSpoke == null || (now - lastSpoke)/300000 > Math.random() + .2) {
      this.lastSpoke.set(text, now);
      return this.speaker.say(text);
    }
  }
}