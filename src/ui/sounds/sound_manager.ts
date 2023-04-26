import { Howl } from 'howler';
import background1 from './res/background1.mp3';
import ambient from './res/ambient.mp3';
import bookFlip1 from './res/Book_Flip-001.mp3';
import bookFlip2 from './res/Book_Flip-002.mp3';
import bookFlip3 from './res/Book_Flip-003.mp3';
import bookFlip4 from './res/Book_Flip-004.mp3';
import cardFlip1 from './res/Card_Flip_01.mp3';
import cardFlip2 from './res/Card_Flip_02.mp3';
import cardFlip3 from './res/Card_Flip_03.mp3';
import cardPlacement1 from './res/Card_Placement_01.mp3';
import cardPlacement2 from './res/Card_Placement_02.mp3';
import cardPlacement3 from './res/Card_Placement_03.mp3';
import cardPlacement4 from './res/Card_Placement_04.mp3';
import { delay } from 'base/delay';

export const enum BackgroundTrack {
  None = 1,
  Ambient,
  Music,
};

export const enum SoundEffect {
  CardFlip = 1,
  CardPlacement,
  BookFlip,
};

const BackgroundVolume = .7;

export class SoundManager {
  private readonly backgroundTracks: Map<BackgroundTrack, Howl>;
  private readonly soundEffects: Map<SoundEffect, Howl[]>;

  private background: Howl | undefined;
  
  constructor() {
    this.backgroundTracks = new Map([
      [BackgroundTrack.Music, new Howl({
        src: background1,
        loop: true,
        volume: BackgroundVolume,
      })],
      [BackgroundTrack.Ambient, new Howl({
        src: ambient,
        loop: true,
        volume: BackgroundVolume,
      })],
    ]);
    this.soundEffects = new Map([
      [
        SoundEffect.BookFlip, 
        toSoundEffects(bookFlip1, bookFlip2, bookFlip3, bookFlip4),
      ],
      [
        SoundEffect.CardFlip,
        toSoundEffects(cardFlip1, cardFlip2, cardFlip3),
      ],
      [
        SoundEffect.CardPlacement,
        toSoundEffects(cardPlacement1, cardPlacement2, cardPlacement3, cardPlacement4),
      ]
    ]);
  }

  async init(): Promise<void> {
    await Promise.all(
      [
        ...this.backgroundTracks.values(),
        ...[...this.soundEffects.values()].flat(),
      ].map(load)
    );
  }

  async playBackgroundTrack(track: BackgroundTrack, fadeTime = 1000) {
    const targetBackground = this.backgroundTracks.get(track);
    if (targetBackground === this.background) {
      return;
    }
    if (this.background != null) {
      this.background.fade(BackgroundVolume, 0, 1000);
      await delay(fadeTime);
      this.background.pause();
    }
    this.background = targetBackground;
    if (this.background != null) {
      this.background.fade(0, BackgroundVolume, fadeTime);
      this.background.play();
    }
  }

  playEffect(effect: SoundEffect) {
    const howls = this.soundEffects.get(effect);
    if (howls != null) {
      const alreadyPlaying = howls.some(howl => howl.playing());
      if (!alreadyPlaying) {
        const howl = howls[Math.floor(Math.random()*howls.length)];
        howl.play();
      }
    }
  }

  pause() {
    this.background?.pause();
  }

  resume() {
    this.background?.play();
  }
}

function load(howl: Howl): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (howl.state() === 'loaded') {
      return resolve();
    }
    howl.on('load', resolve);
    howl.on('loaderror', reject);
  });
}

function toSoundEffects(...srcs: string[]) {
  return srcs.map(src => {
    return new Howl({
      src,
      volume: .2,
    });  
  });
}
