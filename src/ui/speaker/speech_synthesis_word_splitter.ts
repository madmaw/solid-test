import { WordSplitter, WordSplitterListener } from "./rendering_speaker";

export class SpeechSynthesisWordSplitter implements WordSplitter {
  private cachedVoice: SpeechSynthesisVoice | undefined;
  private cachedUtterances: Map<string, SpeechSynthesisUtterance> = new Map();

  constructor(
    private readonly speechSynthesis: SpeechSynthesis,
    private readonly fallback: WordSplitter,
  ) {
    speechSynthesis.onvoiceschanged = () => this.cachedVoice = undefined;
  }

  private get voice() {
    if (this.cachedVoice == null) {
      this.cachedVoice = this.calculateVoice();
    }
    return this.cachedVoice;
  }

  private calculateVoice() {
    const voices = this.speechSynthesis?.getVoices();
    if (!voices?.length) {
      return;
    }
    const bestVoices = voices.filter(voice => 'EN-GB' === voice.lang.toUpperCase());
    const bestVoice = bestVoices.find(voice => voice.name.toUpperCase().indexOf(' MALE') >= 0);
    if (bestVoice != null) {
      return bestVoice;
    }
    if (bestVoices.length > 0) {
      return bestVoices[0];
    }
    const defaultVoice = voices.find(voice => voice.default);
    if (defaultVoice != null) {
      return defaultVoice;
    }
    return voices[0];
  }
  

  async say(text: string, listener: WordSplitterListener): Promise<void> {
    const utterance = this.calculateUtterance(text);
    if(utterance) {
      // unfortunately onend/onboundary do not work correctly
      this.speechSynthesis.speak(utterance);
    }
    await this.fallback.say(text, listener);
  }

  private calculateUtterance(text: string) {
    let utterance = this.cachedUtterances.get(text);
    if (utterance != null) {
      return utterance;
    }
    const voice = this.voice;
    if (!voice) {
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.addEventListener('boundary', e => console.log(e));
    utterance.rate = 1;
    utterance.pitch = .4;
    utterance.lang = 'en';
    utterance.voice = voice;
    this.cachedUtterances.set(text, utterance);
    return utterance;
  }
}