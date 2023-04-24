export interface Speaker {
  say(text: string): Promise<void>;
}
